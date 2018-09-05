package com.sealfx.service.mapper;

import com.sealfx.domain.*;
import com.sealfx.service.dto.BankDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Bank and its DTO BankDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerBankMapper.class})
public interface BankMapper extends EntityMapper<BankDTO, Bank> {

    @Mapping(source = "customer.id", target = "customerId")
    BankDTO toDto(Bank bank);

    @Mapping(source = "customerId", target = "customer")
    Bank toEntity(BankDTO bankDTO);

    default Bank fromId(Long id) {
        if (id == null) {
            return null;
        }
        Bank bank = new Bank();
        bank.setId(id);
        return bank;
    }
}
