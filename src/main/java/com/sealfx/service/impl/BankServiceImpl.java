package com.sealfx.service.impl;

import com.sealfx.service.BankService;
import com.sealfx.domain.Bank;
import com.sealfx.repository.BankRepository;
import com.sealfx.service.dto.BankDTO;
import com.sealfx.service.mapper.BankMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing Bank.
 */
@Service
@Transactional
public class BankServiceImpl implements BankService {

    private final Logger log = LoggerFactory.getLogger(BankServiceImpl.class);

    private final BankRepository bankRepository;

    private final BankMapper bankMapper;

    public BankServiceImpl(BankRepository bankRepository, BankMapper bankMapper) {
        this.bankRepository = bankRepository;
        this.bankMapper = bankMapper;
    }

    /**
     * Save a bank.
     *
     * @param bankDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BankDTO save(BankDTO bankDTO) {
        log.debug("Request to save Bank : {}", bankDTO);
        Bank bank = bankMapper.toEntity(bankDTO);
        bank = bankRepository.save(bank);
        return bankMapper.toDto(bank);
    }

    /**
     * Get all the banks.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<BankDTO> findAll() {
        log.debug("Request to get all Banks");
        return bankRepository.findAll().stream()
            .map(bankMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one bank by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BankDTO> findOne(Long id) {
        log.debug("Request to get Bank : {}", id);
        return bankRepository.findById(id)
            .map(bankMapper::toDto);
    }

    /**
     * Delete the bank by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Bank : {}", id);
        bankRepository.deleteById(id);
    }
}
