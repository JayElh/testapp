package com.sealfx.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CustomerBank entity.
 */
public class CustomerBankDTO implements Serializable {

    private Long id;

    private String fix;

    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFix() {
        return fix;
    }

    public void setFix(String fix) {
        this.fix = fix;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerBankDTO customerBankDTO = (CustomerBankDTO) o;
        if (customerBankDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerBankDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerBankDTO{" +
            "id=" + getId() +
            ", fix='" + getFix() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
