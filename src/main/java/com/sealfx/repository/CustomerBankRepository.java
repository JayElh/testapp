package com.sealfx.repository;

import com.sealfx.domain.CustomerBank;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CustomerBank entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerBankRepository extends JpaRepository<CustomerBank, Long> {

}
