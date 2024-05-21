package com.ShopNook.ecommerce.config;

import com.ShopNook.ecommerce.entity.Product;
import com.ShopNook.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.http.HttpMethod;

@Configuration
public class DataRestConfiguration implements RepositoryRestConfigurer
{

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors)
    {
        HttpMethod[] disallowedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        // Restricting HTTP methods for Product: PUT, POST, DELETE
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(disallowedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(disallowedActions));

        // Restricting HTTP methods for ProductCategory: PUT, POST, DELETE
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(disallowedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(disallowedActions));

    }
}
