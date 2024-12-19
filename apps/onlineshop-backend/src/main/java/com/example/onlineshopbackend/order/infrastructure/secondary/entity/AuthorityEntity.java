package com.example.onlineshopbackend.order.infrastructure.secondary.entity;

import com.example.onlineshopbackend.order.domain.user.aggregate.Authority;
import com.example.onlineshopbackend.order.domain.user.aggregate.AuthorityBuilder;
import com.example.onlineshopbackend.order.domain.user.vo.AuthorityName;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.jilt.Builder;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "authority")
@Builder
public class AuthorityEntity {

  @Id
  @Column(length = 100, nullable = false)
  private String name;

  public AuthorityEntity() {
  }

  public AuthorityEntity(String name) {
    this.name = name;
  }

  public static Set<AuthorityEntity> from(Set<Authority> authorities) {
    return authorities.stream()
      .peek(authority -> System.out.println("Authority name: " + authority.getName().name()))
      .map(authority -> AuthorityEntityBuilder.authorityEntity()
        .name(authority.getName().name()).build())
      .collect(Collectors.toSet());
  }

  public static Set<Authority> toDomain(Set<AuthorityEntity> authorityEntities) {
    return authorityEntities.stream()
      .map(authorityEntity -> AuthorityBuilder.authority().name(new AuthorityName(authorityEntity.name)).build())
      .collect(Collectors.toSet());
  }

  public @NotNull @Size(max = 100) String getName() {
    return name;
  }

  public void setName(@NotNull @Size(max = 50) String name) {
    this.name = name;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof AuthorityEntity that)) return false;
    return Objects.equals(name, that.name);
  }

  @Override
  public int hashCode() {
    return Objects.hashCode(name);
  }
}
