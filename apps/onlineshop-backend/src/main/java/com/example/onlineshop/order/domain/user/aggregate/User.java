package com.example.onlineshop.order.domain.user.aggregate;

import com.example.onlineshop.order.domain.user.vo.*;
import com.example.onlineshop.shared.error.domain.Assert;
import org.jilt.Builder;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Builder
public class User {

    private UserLastName lastName;

    private UserFirstName firstName;

    private UserEmail email;

    private UserPublicId userPublicId;

    private UserImageUrl imageUrl;

    private final Instant lastModifiedDate;

    private final Instant createdDate;

    private final Set<Authority> authorities;

    private final Long dbId;

    private final UserAddress userAddress;

    private final Instant lastSeen;

    public User(UserLastName lastName, UserFirstName firstName, UserEmail email, UserPublicId userPublicId, UserImageUrl imageUrl, Instant lastModafiedDate, Instant createdDate, Set<Authority> authorities, Long dbId, UserAddress userAddress, Instant lastSeen) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.userPublicId = userPublicId;
        this.imageUrl = imageUrl;
        this.lastModifiedDate = lastModafiedDate;
        this.createdDate = createdDate;
        this.authorities = authorities;
        this.dbId = dbId;
        this.userAddress = userAddress;
        this.lastSeen = lastSeen;
    }

    private void assertMandatoryFIelds() {
        Assert.notNull("lastName", lastName);
        Assert.notNull("firstName", firstName);
        Assert.notNull("email", email);
        Assert.notNull("authorities", authorities);
    }

    public void updateFromUser(User user) {
        this.email = user.email;
        this.imageUrl = user.imageUrl;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
    }

    public void initFieldForSignup() {
        this.userPublicId = new UserPublicId(UUID.randomUUID());
    }

    public static User fromTokenAttributes(Map<String, Object> attributes, List<String> rolesFromAccessToken) {
        UserBuilder userBuilder = UserBuilder.user();

        if(attributes.containsKey("preferred_email")) {
            userBuilder.email(new UserEmail(attributes.get("preferred_email").toString()));
        }

        if(attributes.containsKey("last_name")) {
            userBuilder.lastName(new UserLastName(attributes.get("last_name").toString()));
        }

        if(attributes.containsKey("first_name")) {
            userBuilder.firstName(new UserFirstName(attributes.get("first_name").toString()));
        }

        if(attributes.containsKey("picture")) {
            userBuilder.imageUrl(new UserImageUrl(attributes.get("picture").toString()));
        }

        if(attributes.containsKey("last_signed_in")) {
            userBuilder.lastSeen(Instant.parse(attributes.get("last_signed_in").toString()));
        }

        Set<Authority> authorities = rolesFromAccessToken
                .stream()
                .map(authority -> AuthorityBuilder.authority().name(new AuthorityName(authority)).build())
                .collect(Collectors.toSet());

        userBuilder.authorities(authorities);

        return userBuilder.build();
    }

    public UserLastName getLastName() {
        return lastName;
    }

    public UserFirstName getFirstName() {
        return firstName;
    }

    public UserEmail getEmail() {
        return email;
    }

    public UserPublicId getUserPublicId() {
        return userPublicId;
    }

    public UserImageUrl getImageUrl() {
        return imageUrl;
    }

    public Instant getLastModafiedDate() {
        return lastModifiedDate;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public Long getDbId() {
        return dbId;
    }

    public UserAddress getUserAddress() {
        return userAddress;
    }

    public Instant getLastSeen() {
        return lastSeen;
    }
}
