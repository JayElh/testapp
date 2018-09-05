package com.sealfx.service.impl;

import com.sealfx.service.CustomerBankService;
import com.sealfx.domain.CustomerBank;
import com.sealfx.repository.CustomerBankRepository;
import com.sealfx.service.dto.CustomerBankDTO;
import com.sealfx.service.mapper.CustomerBankMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing CustomerBank.
 */
@Service
@Transactional
public class CustomerBankServiceImpl implements CustomerBankService {

    private final Logger log = LoggerFactory.getLogger(CustomerBankServiceImpl.class);

    private final CustomerBankRepository customerBankRepository;

    private final CustomerBankMapper customerBankMapper;

    public CustomerBankServiceImpl(CustomerBankRepository customerBankRepository, CustomerBankMapper customerBankMapper) {
        this.customerBankRepository = customerBankRepository;
        this.customerBankMapper = customerBankMapper;
    }

    /**
     * Save a customerBank.
     *
     * @param customerBankDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CustomerBankDTO save(CustomerBankDTO customerBankDTO) {
        log.debug("Request to save CustomerBank : {}", customerBankDTO);
        CustomerBank customerBank = customerBankMapper.toEntity(customerBankDTO);
        customerBank = customerBankRepository.save(customerBank);
        return customerBankMapper.toDto(customerBank);
    }

    /**
     * Get all the customerBanks.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CustomerBankDTO> findAll() {
        log.debug("Request to get all CustomerBanks");
        return customerBankRepository.findAll().stream()
            .map(customerBankMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one customerBank by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CustomerBankDTO> findOne(Long id) {
        log.debug("Request to get CustomerBank : {}", id);
        return customerBankRepository.findById(id)
            .map(customerBankMapper::toDto);
    }

    /**
     * Delete the customerBank by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CustomerBank : {}", id);
        customerBankRepository.deleteById(id);
    }
}
