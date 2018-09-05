package com.sealfx.service;

import com.sealfx.service.dto.CoreUserDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CoreUser.
 */
public interface CoreUserService {

    /**
     * Save a coreUser.
     *
     * @param coreUserDTO the entity to save
     * @return the persisted entity
     */
    CoreUserDTO save(CoreUserDTO coreUserDTO);

    /**
     * Get all the coreUsers.
     *
     * @return the list of entities
     */
    List<CoreUserDTO> findAll();


    /**
     * Get the "id" coreUser.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CoreUserDTO> findOne(Long id);

    /**
     * Delete the "id" coreUser.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
