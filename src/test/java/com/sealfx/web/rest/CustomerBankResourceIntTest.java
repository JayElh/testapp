package com.sealfx.web.rest;

import com.sealfx.TestApp;

import com.sealfx.domain.CustomerBank;
import com.sealfx.repository.CustomerBankRepository;
import com.sealfx.service.CustomerBankService;
import com.sealfx.service.dto.CustomerBankDTO;
import com.sealfx.service.mapper.CustomerBankMapper;
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
 * Test class for the CustomerBankResource REST controller.
 *
 * @see CustomerBankResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestApp.class)
public class CustomerBankResourceIntTest {

    private static final String DEFAULT_FIX = "AAAAAAAAAA";
    private static final String UPDATED_FIX = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    @Autowired
    private CustomerBankRepository customerBankRepository;

    @Autowired
    private CustomerBankMapper customerBankMapper;
    
    @Autowired
    private CustomerBankService customerBankService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCustomerBankMockMvc;

    private CustomerBank customerBank;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomerBankResource customerBankResource = new CustomerBankResource(customerBankService);
        this.restCustomerBankMockMvc = MockMvcBuilders.standaloneSetup(customerBankResource)
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
    public static CustomerBank createEntity(EntityManager em) {
        CustomerBank customerBank = new CustomerBank()
            .fix(DEFAULT_FIX)
            .status(DEFAULT_STATUS);
        return customerBank;
    }

    @Before
    public void initTest() {
        customerBank = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerBank() throws Exception {
        int databaseSizeBeforeCreate = customerBankRepository.findAll().size();

        // Create the CustomerBank
        CustomerBankDTO customerBankDTO = customerBankMapper.toDto(customerBank);
        restCustomerBankMockMvc.perform(post("/api/customer-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerBankDTO)))
            .andExpect(status().isCreated());

        // Validate the CustomerBank in the database
        List<CustomerBank> customerBankList = customerBankRepository.findAll();
        assertThat(customerBankList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerBank testCustomerBank = customerBankList.get(customerBankList.size() - 1);
        assertThat(testCustomerBank.getFix()).isEqualTo(DEFAULT_FIX);
        assertThat(testCustomerBank.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createCustomerBankWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerBankRepository.findAll().size();

        // Create the CustomerBank with an existing ID
        customerBank.setId(1L);
        CustomerBankDTO customerBankDTO = customerBankMapper.toDto(customerBank);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerBankMockMvc.perform(post("/api/customer-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerBankDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerBank in the database
        List<CustomerBank> customerBankList = customerBankRepository.findAll();
        assertThat(customerBankList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCustomerBanks() throws Exception {
        // Initialize the database
        customerBankRepository.saveAndFlush(customerBank);

        // Get all the customerBankList
        restCustomerBankMockMvc.perform(get("/api/customer-banks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerBank.getId().intValue())))
            .andExpect(jsonPath("$.[*].fix").value(hasItem(DEFAULT_FIX.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getCustomerBank() throws Exception {
        // Initialize the database
        customerBankRepository.saveAndFlush(customerBank);

        // Get the customerBank
        restCustomerBankMockMvc.perform(get("/api/customer-banks/{id}", customerBank.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customerBank.getId().intValue()))
            .andExpect(jsonPath("$.fix").value(DEFAULT_FIX.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCustomerBank() throws Exception {
        // Get the customerBank
        restCustomerBankMockMvc.perform(get("/api/customer-banks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerBank() throws Exception {
        // Initialize the database
        customerBankRepository.saveAndFlush(customerBank);

        int databaseSizeBeforeUpdate = customerBankRepository.findAll().size();

        // Update the customerBank
        CustomerBank updatedCustomerBank = customerBankRepository.findById(customerBank.getId()).get();
        // Disconnect from session so that the updates on updatedCustomerBank are not directly saved in db
        em.detach(updatedCustomerBank);
        updatedCustomerBank
            .fix(UPDATED_FIX)
            .status(UPDATED_STATUS);
        CustomerBankDTO customerBankDTO = customerBankMapper.toDto(updatedCustomerBank);

        restCustomerBankMockMvc.perform(put("/api/customer-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerBankDTO)))
            .andExpect(status().isOk());

        // Validate the CustomerBank in the database
        List<CustomerBank> customerBankList = customerBankRepository.findAll();
        assertThat(customerBankList).hasSize(databaseSizeBeforeUpdate);
        CustomerBank testCustomerBank = customerBankList.get(customerBankList.size() - 1);
        assertThat(testCustomerBank.getFix()).isEqualTo(UPDATED_FIX);
        assertThat(testCustomerBank.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerBank() throws Exception {
        int databaseSizeBeforeUpdate = customerBankRepository.findAll().size();

        // Create the CustomerBank
        CustomerBankDTO customerBankDTO = customerBankMapper.toDto(customerBank);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerBankMockMvc.perform(put("/api/customer-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerBankDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerBank in the database
        List<CustomerBank> customerBankList = customerBankRepository.findAll();
        assertThat(customerBankList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomerBank() throws Exception {
        // Initialize the database
        customerBankRepository.saveAndFlush(customerBank);

        int databaseSizeBeforeDelete = customerBankRepository.findAll().size();

        // Get the customerBank
        restCustomerBankMockMvc.perform(delete("/api/customer-banks/{id}", customerBank.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CustomerBank> customerBankList = customerBankRepository.findAll();
        assertThat(customerBankList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerBank.class);
        CustomerBank customerBank1 = new CustomerBank();
        customerBank1.setId(1L);
        CustomerBank customerBank2 = new CustomerBank();
        customerBank2.setId(customerBank1.getId());
        assertThat(customerBank1).isEqualTo(customerBank2);
        customerBank2.setId(2L);
        assertThat(customerBank1).isNotEqualTo(customerBank2);
        customerBank1.setId(null);
        assertThat(customerBank1).isNotEqualTo(customerBank2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerBankDTO.class);
        CustomerBankDTO customerBankDTO1 = new CustomerBankDTO();
        customerBankDTO1.setId(1L);
        CustomerBankDTO customerBankDTO2 = new CustomerBankDTO();
        assertThat(customerBankDTO1).isNotEqualTo(customerBankDTO2);
        customerBankDTO2.setId(customerBankDTO1.getId());
        assertThat(customerBankDTO1).isEqualTo(customerBankDTO2);
        customerBankDTO2.setId(2L);
        assertThat(customerBankDTO1).isNotEqualTo(customerBankDTO2);
        customerBankDTO1.setId(null);
        assertThat(customerBankDTO1).isNotEqualTo(customerBankDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(customerBankMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(customerBankMapper.fromId(null)).isNull();
    }
}
