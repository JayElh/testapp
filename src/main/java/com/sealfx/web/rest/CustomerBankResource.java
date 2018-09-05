package com.sealfx.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sealfx.service.CustomerBankService;
import com.sealfx.web.rest.errors.BadRequestAlertException;
import com.sealfx.web.rest.util.HeaderUtil;
import com.sealfx.service.dto.CustomerBankDTO;
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
 * REST controller for managing CustomerBank.
 */
@RestController
@RequestMapping("/api")
public class CustomerBankResource {

    private final Logger log = LoggerFactory.getLogger(CustomerBankResource.class);

    private static final String ENTITY_NAME = "customerBank";

    private final CustomerBankService customerBankService;

    public CustomerBankResource(CustomerBankService customerBankService) {
        this.customerBankService = customerBankService;
    }

    /**
     * POST  /customer-banks : Create a new customerBank.
     *
     * @param customerBankDTO the customerBankDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerBankDTO, or with status 400 (Bad Request) if the customerBank has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-banks")
    @Timed
    public ResponseEntity<CustomerBankDTO> createCustomerBank(@RequestBody CustomerBankDTO customerBankDTO) throws URISyntaxException {
        log.debug("REST request to save CustomerBank : {}", customerBankDTO);
        if (customerBankDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerBank cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerBankDTO result = customerBankService.save(customerBankDTO);
        return ResponseEntity.created(new URI("/api/customer-banks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-banks : Updates an existing customerBank.
     *
     * @param customerBankDTO the customerBankDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerBankDTO,
     * or with status 400 (Bad Request) if the customerBankDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerBankDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-banks")
    @Timed
    public ResponseEntity<CustomerBankDTO> updateCustomerBank(@RequestBody CustomerBankDTO customerBankDTO) throws URISyntaxException {
        log.debug("REST request to update CustomerBank : {}", customerBankDTO);
        if (customerBankDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomerBankDTO result = customerBankService.save(customerBankDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerBankDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-banks : get all the customerBanks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of customerBanks in body
     */
    @GetMapping("/customer-banks")
    @Timed
    public List<CustomerBankDTO> getAllCustomerBanks() {
        log.debug("REST request to get all CustomerBanks");
        return customerBankService.findAll();
    }

    /**
     * GET  /customer-banks/:id : get the "id" customerBank.
     *
     * @param id the id of the customerBankDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerBankDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-banks/{id}")
    @Timed
    public ResponseEntity<CustomerBankDTO> getCustomerBank(@PathVariable Long id) {
        log.debug("REST request to get CustomerBank : {}", id);
        Optional<CustomerBankDTO> customerBankDTO = customerBankService.findOne(id);
        return ResponseUtil.wrapOrNotFound(customerBankDTO);
    }

    /**
     * DELETE  /customer-banks/:id : delete the "id" customerBank.
     *
     * @param id the id of the customerBankDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-banks/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerBank(@PathVariable Long id) {
        log.debug("REST request to delete CustomerBank : {}", id);
        customerBankService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
