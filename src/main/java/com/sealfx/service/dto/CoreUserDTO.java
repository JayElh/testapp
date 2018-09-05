package com.sealfx.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CoreUser entity.
 */
public class CoreUserDTO implements Serializable {

    private Long id;

    private String name;

    private String password;

    private String test;

    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
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

        CoreUserDTO coreUserDTO = (CoreUserDTO) o;
        if (coreUserDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), coreUserDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CoreUserDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", password='" + getPassword() + "'" +
            ", test='" + getTest() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
