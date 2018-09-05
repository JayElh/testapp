package com.sealfx.service.mapper;

import com.sealfx.domain.*;
import com.sealfx.service.dto.CoreUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CoreUser and its DTO CoreUserDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CoreUserMapper extends EntityMapper<CoreUserDTO, CoreUser> {



    default CoreUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        CoreUser coreUser = new CoreUser();
        coreUser.setId(id);
        return coreUser;
    }
}
