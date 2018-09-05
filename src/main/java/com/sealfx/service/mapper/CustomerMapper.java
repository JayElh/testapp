package com.sealfx.service.mapper;

import com.sealfx.domain.*;
import com.sealfx.service.dto.CustomerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Customer and its DTO CustomerDTO.
 */
@Mapper(componentModel = "spring", uses = {CoreUserMapper.class})
public interface CustomerMapper extends EntityMapper<CustomerDTO, Customer> {

    @Mapping(source = "parent.id", target = "parentId")
    @Mapping(source = "coreuser.id", target = "coreuserId")
    CustomerDTO toDto(Customer customer);

    @Mapping(source = "parentId", target = "parent")
    @Mapping(source = "coreuserId", target = "coreuser")
    Customer toEntity(CustomerDTO customerDTO);

    default Customer fromId(Long id) {
        if (id == null) {
            return null;
        }
        Customer customer = new Customer();
        customer.setId(id);
        return customer;
    }
}
