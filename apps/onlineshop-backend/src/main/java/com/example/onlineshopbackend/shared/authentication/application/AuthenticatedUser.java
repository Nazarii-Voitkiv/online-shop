package com.example.onlineshopbackend.shared.authentication.application;

import com.example.onlineshopbackend.shared.authentication.domain.Username;
import com.example.onlineshopbackend.shared.error.domain.Assert;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public final class AuthenticatedUser {

  public static final String PREFERRED_USERNAME = "email";

  private AuthenticatedUser() {
  }

  public static Username username() {
    return optionalUsername().orElseThrow(NotAuthenticatedUserException::new);
  }

  public static Optional<Username> optionalUsername() {
    return authentication().map(AuthenticatedUser::readPrincipal).flatMap(Username::of);
  }

  public static String readPrincipal(Authentication authentication) {
    Assert.notNull("authentication", authentication);

    if (authentication.getPrincipal() instanceof UserDetails details) {
      return details.getUsername();
    }

    if (authentication instanceof JwtAuthenticationToken token) {
      return (String) token.getToken().getClaims().get(PREFERRED_USERNAME);
    }

    if (authentication.getPrincipal() instanceof DefaultOidcUser oidcUser) {
      return (String) oidcUser.getAttributes().get(PREFERRED_USERNAME);
    }

    if (authentication.getPrincipal() instanceof String principal) {
      return principal;
    }

    throw new UnknownAuthenticationException();
  }

  private static Optional<Authentication> authentication() {
    return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication());
  }

  public static List<String> extractRolesFromToken(Jwt jwtToken) {
    List<Map<String, Object>> rolesObjects = jwtToken.getClaim("roles");

    if (rolesObjects != null) {
      return rolesObjects.stream()
        .map(roleObj -> roleObj.get("name").toString())
        .collect(Collectors.toList());
    }

    return List.of();
  }
}
