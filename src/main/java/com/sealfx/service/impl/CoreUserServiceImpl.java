package com.sealfx.service.impl;

import com.sealfx.service.CoreUserService;
import com.sealfx.domain.CoreUser;
import com.sealfx.repository.CoreUserRepository;
import com.sealfx.service.dto.CoreUserDTO;
import com.sealfx.service.mapper.CoreUserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing CoreUser.
 */
@Service
@Transactional
public class CoreUserServiceImpl implements CoreUserService {

    private final Logger log = LoggerFactory.getLogger(CoreUserServiceImpl.class);

    private final CoreUserRepository coreUserRepository;

    private final CoreUserMapper coreUserMapper;

    public CoreUserServiceImpl(CoreUserRepository coreUserRepository, CoreUserMapper coreUserMapper) {
        this.coreUserRepository = coreUserRepository;
        this.coreUserMapper = coreUserMapper;
    }

    /**
     * Save a coreUser.
     *
     * @param coreUserDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CoreUserDTO save(CoreUserDTO coreUserDTO) {
        log.debug("Request to save CoreUser : {}", coreUserDTO);
        CoreUser coreUser = coreUserMapper.toEntity(coreUserDTO);
        coreUser = coreUserRepository.save(coreUser);
        return coreUserMapper.toDto(coreUser);
    }

    /**
     * Get all the coreUsers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CoreUserDTO> findAll() {
        log.debug("Request to get all CoreUsers");
        return coreUserRepository.findAll().stream()
            .map(coreUserMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one coreUser by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CoreUserDTO> findOne(Long id) {
        log.debug("Request to get CoreUser : {}", id);
        return coreUserRepository.findById(id)
            .map(coreUserMapper::toDto);
    }

    /**
     * Delete the coreUser by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CoreUser : {}", id);
        coreUserRepository.deleteById(id);
    }
}
