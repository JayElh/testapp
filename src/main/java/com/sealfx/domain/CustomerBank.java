package com.sealfx.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CustomerBank.
 */
@Entity
@Table(name = "customer_bank")
public class CustomerBank implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fix")
    private String fix;

    @Column(name = "status")
    private String status;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFix() {
        return fix;
    }

    public CustomerBank fix(String fix) {
        this.fix = fix;
        return this;
    }

    public void setFix(String fix) {
        this.fix = fix;
    }

    public String getStatus() {
        return status;
    }

    public CustomerBank status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CustomerBank customerBank = (CustomerBank) o;
        if (customerBank.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerBank.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerBank{" +
            "id=" + getId() +
            ", fix='" + getFix() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
