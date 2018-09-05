package com.sealfx.service.mapper;

import com.sealfx.domain.*;
import com.sealfx.service.dto.CustomerBankDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerBank and its DTO CustomerBankDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CustomerBankMapper extends EntityMapper<CustomerBankDTO, CustomerBank> {



    default CustomerBank fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerBank customerBank = new CustomerBank();
        customerBank.setId(id);
        return customerBank;
    }
}
