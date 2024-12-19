package com.example.onlineshopbackend.product.domain.aggregate;

import com.example.onlineshopbackend.product.domain.vo.ProductSize;
import com.example.onlineshopbackend.product.domain.vo.PublicId;
import org.jilt.Builder;

import java.util.List;

@Builder
public record FilterQuery(PublicId categoryId, List<ProductSize> sizes, String name) {
}
