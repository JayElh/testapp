package com.sealfx.repository;

import com.sealfx.domain.CoreUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CoreUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CoreUserRepository extends JpaRepository<CoreUser, Long> {

}
