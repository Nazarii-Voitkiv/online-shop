package com.example.onlineshopbackend.product.domain.aggregate;

import com.example.onlineshopbackend.shared.error.domain.Assert;
import org.jilt.Builder;

@Builder
public record Picture(byte[] file, String mimeType) {

  public Picture {
    Assert.notNull("file", file);
    Assert.notNull("mimeType", mimeType);
  }
}
