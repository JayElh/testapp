package com.sealfx.service.mapper;

import com.sealfx.domain.*;
import com.sealfx.service.dto.CustomerBankDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerBank and its DTO CustomerBankDTO.
 */
@Mapper(componentModel = "spring", uses = {BankMapper.class, CustomerMapper.class})
public interface CustomerBankMapper extends EntityMapper<CustomerBankDTO, CustomerBank> {

    @Mapping(source = "bank.id", target = "bankId")
    @Mapping(source = "customer.id", target = "customerId")
    CustomerBankDTO toDto(CustomerBank customerBank);

    @Mapping(source = "bankId", target = "bank")
    @Mapping(source = "customerId", target = "customer")
    CustomerBank toEntity(CustomerBankDTO customerBankDTO);

    default CustomerBank fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerBank customerBank = new CustomerBank();
        customerBank.setId(id);
        return customerBank;
    }
}
