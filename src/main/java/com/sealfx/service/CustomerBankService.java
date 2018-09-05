package com.sealfx.service;

import com.sealfx.service.dto.CustomerBankDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CustomerBank.
 */
public interface CustomerBankService {

    /**
     * Save a customerBank.
     *
     * @param customerBankDTO the entity to save
     * @return the persisted entity
     */
    CustomerBankDTO save(CustomerBankDTO customerBankDTO);

    /**
     * Get all the customerBanks.
     *
     * @return the list of entities
     */
    List<CustomerBankDTO> findAll();


    /**
     * Get the "id" customerBank.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CustomerBankDTO> findOne(Long id);

    /**
     * Delete the "id" customerBank.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
