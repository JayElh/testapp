package com.sealfx.web.rest;

import com.sealfx.TestApp;

import com.sealfx.domain.CoreUser;
import com.sealfx.repository.CoreUserRepository;
import com.sealfx.service.CoreUserService;
import com.sealfx.service.dto.CoreUserDTO;
import com.sealfx.service.mapper.CoreUserMapper;
import com.sealfx.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.sealfx.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CoreUserResource REST controller.
 *
 * @see CoreUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestApp.class)
public class CoreUserResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_TEST = "AAAAAAAAAA";
    private static final String UPDATED_TEST = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    @Autowired
    private CoreUserRepository coreUserRepository;

    @Autowired
    private CoreUserMapper coreUserMapper;
    
    @Autowired
    private CoreUserService coreUserService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCoreUserMockMvc;

    private CoreUser coreUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CoreUserResource coreUserResource = new CoreUserResource(coreUserService);
        this.restCoreUserMockMvc = MockMvcBuilders.standaloneSetup(coreUserResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CoreUser createEntity(EntityManager em) {
        CoreUser coreUser = new CoreUser()
            .name(DEFAULT_NAME)
            .password(DEFAULT_PASSWORD)
            .test(DEFAULT_TEST)
            .status(DEFAULT_STATUS);
        return coreUser;
    }

    @Before
    public void initTest() {
        coreUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createCoreUser() throws Exception {
        int databaseSizeBeforeCreate = coreUserRepository.findAll().size();

        // Create the CoreUser
        CoreUserDTO coreUserDTO = coreUserMapper.toDto(coreUser);
        restCoreUserMockMvc.perform(post("/api/core-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coreUserDTO)))
            .andExpect(status().isCreated());

        // Validate the CoreUser in the database
        List<CoreUser> coreUserList = coreUserRepository.findAll();
        assertThat(coreUserList).hasSize(databaseSizeBeforeCreate + 1);
        CoreUser testCoreUser = coreUserList.get(coreUserList.size() - 1);
        assertThat(testCoreUser.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCoreUser.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testCoreUser.getTest()).isEqualTo(DEFAULT_TEST);
        assertThat(testCoreUser.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createCoreUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = coreUserRepository.findAll().size();

        // Create the CoreUser with an existing ID
        coreUser.setId(1L);
        CoreUserDTO coreUserDTO = coreUserMapper.toDto(coreUser);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCoreUserMockMvc.perform(post("/api/core-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coreUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CoreUser in the database
        List<CoreUser> coreUserList = coreUserRepository.findAll();
        assertThat(coreUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCoreUsers() throws Exception {
        // Initialize the database
        coreUserRepository.saveAndFlush(coreUser);

        // Get all the coreUserList
        restCoreUserMockMvc.perform(get("/api/core-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coreUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].test").value(hasItem(DEFAULT_TEST.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getCoreUser() throws Exception {
        // Initialize the database
        coreUserRepository.saveAndFlush(coreUser);

        // Get the coreUser
        restCoreUserMockMvc.perform(get("/api/core-users/{id}", coreUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(coreUser.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD.toString()))
            .andExpect(jsonPath("$.test").value(DEFAULT_TEST.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCoreUser() throws Exception {
        // Get the coreUser
        restCoreUserMockMvc.perform(get("/api/core-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCoreUser() throws Exception {
        // Initialize the database
        coreUserRepository.saveAndFlush(coreUser);

        int databaseSizeBeforeUpdate = coreUserRepository.findAll().size();

        // Update the coreUser
        CoreUser updatedCoreUser = coreUserRepository.findById(coreUser.getId()).get();
        // Disconnect from session so that the updates on updatedCoreUser are not directly saved in db
        em.detach(updatedCoreUser);
        updatedCoreUser
            .name(UPDATED_NAME)
            .password(UPDATED_PASSWORD)
            .test(UPDATED_TEST)
            .status(UPDATED_STATUS);
        CoreUserDTO coreUserDTO = coreUserMapper.toDto(updatedCoreUser);

        restCoreUserMockMvc.perform(put("/api/core-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coreUserDTO)))
            .andExpect(status().isOk());

        // Validate the CoreUser in the database
        List<CoreUser> coreUserList = coreUserRepository.findAll();
        assertThat(coreUserList).hasSize(databaseSizeBeforeUpdate);
        CoreUser testCoreUser = coreUserList.get(coreUserList.size() - 1);
        assertThat(testCoreUser.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCoreUser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testCoreUser.getTest()).isEqualTo(UPDATED_TEST);
        assertThat(testCoreUser.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingCoreUser() throws Exception {
        int databaseSizeBeforeUpdate = coreUserRepository.findAll().size();

        // Create the CoreUser
        CoreUserDTO coreUserDTO = coreUserMapper.toDto(coreUser);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCoreUserMockMvc.perform(put("/api/core-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coreUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CoreUser in the database
        List<CoreUser> coreUserList = coreUserRepository.findAll();
        assertThat(coreUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCoreUser() throws Exception {
        // Initialize the database
        coreUserRepository.saveAndFlush(coreUser);

        int databaseSizeBeforeDelete = coreUserRepository.findAll().size();

        // Get the coreUser
        restCoreUserMockMvc.perform(delete("/api/core-users/{id}", coreUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CoreUser> coreUserList = coreUserRepository.findAll();
        assertThat(coreUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CoreUser.class);
        CoreUser coreUser1 = new CoreUser();
        coreUser1.setId(1L);
        CoreUser coreUser2 = new CoreUser();
        coreUser2.setId(coreUser1.getId());
        assertThat(coreUser1).isEqualTo(coreUser2);
        coreUser2.setId(2L);
        assertThat(coreUser1).isNotEqualTo(coreUser2);
        coreUser1.setId(null);
        assertThat(coreUser1).isNotEqualTo(coreUser2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CoreUserDTO.class);
        CoreUserDTO coreUserDTO1 = new CoreUserDTO();
        coreUserDTO1.setId(1L);
        CoreUserDTO coreUserDTO2 = new CoreUserDTO();
        assertThat(coreUserDTO1).isNotEqualTo(coreUserDTO2);
        coreUserDTO2.setId(coreUserDTO1.getId());
        assertThat(coreUserDTO1).isEqualTo(coreUserDTO2);
        coreUserDTO2.setId(2L);
        assertThat(coreUserDTO1).isNotEqualTo(coreUserDTO2);
        coreUserDTO1.setId(null);
        assertThat(coreUserDTO1).isNotEqualTo(coreUserDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(coreUserMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(coreUserMapper.fromId(null)).isNull();
    }
}
