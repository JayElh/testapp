package com.sealfx.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sealfx.service.CoreUserService;
import com.sealfx.web.rest.errors.BadRequestAlertException;
import com.sealfx.web.rest.util.HeaderUtil;
import com.sealfx.service.dto.CoreUserDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CoreUser.
 */
@RestController
@RequestMapping("/api")
public class CoreUserResource {

    private final Logger log = LoggerFactory.getLogger(CoreUserResource.class);

    private static final String ENTITY_NAME = "coreUser";

    private final CoreUserService coreUserService;

    public CoreUserResource(CoreUserService coreUserService) {
        this.coreUserService = coreUserService;
    }

    /**
     * POST  /core-users : Create a new coreUser.
     *
     * @param coreUserDTO the coreUserDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new coreUserDTO, or with status 400 (Bad Request) if the coreUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/core-users")
    @Timed
    public ResponseEntity<CoreUserDTO> createCoreUser(@RequestBody CoreUserDTO coreUserDTO) throws URISyntaxException {
        log.debug("REST request to save CoreUser : {}", coreUserDTO);
        if (coreUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new coreUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CoreUserDTO result = coreUserService.save(coreUserDTO);
        return ResponseEntity.created(new URI("/api/core-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /core-users : Updates an existing coreUser.
     *
     * @param coreUserDTO the coreUserDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated coreUserDTO,
     * or with status 400 (Bad Request) if the coreUserDTO is not valid,
     * or with status 500 (Internal Server Error) if the coreUserDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/core-users")
    @Timed
    public ResponseEntity<CoreUserDTO> updateCoreUser(@RequestBody CoreUserDTO coreUserDTO) throws URISyntaxException {
        log.debug("REST request to update CoreUser : {}", coreUserDTO);
        if (coreUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CoreUserDTO result = coreUserService.save(coreUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, coreUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /core-users : get all the coreUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of coreUsers in body
     */
    @GetMapping("/core-users")
    @Timed
    public List<CoreUserDTO> getAllCoreUsers() {
        log.debug("REST request to get all CoreUsers");
        return coreUserService.findAll();
    }

    /**
     * GET  /core-users/:id : get the "id" coreUser.
     *
     * @param id the id of the coreUserDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the coreUserDTO, or with status 404 (Not Found)
     */
    @GetMapping("/core-users/{id}")
    @Timed
    public ResponseEntity<CoreUserDTO> getCoreUser(@PathVariable Long id) {
        log.debug("REST request to get CoreUser : {}", id);
        Optional<CoreUserDTO> coreUserDTO = coreUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(coreUserDTO);
    }

    /**
     * DELETE  /core-users/:id : delete the "id" coreUser.
     *
     * @param id the id of the coreUserDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/core-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteCoreUser(@PathVariable Long id) {
        log.debug("REST request to delete CoreUser : {}", id);
        coreUserService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
