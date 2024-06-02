package com.ShopNook.ecommerce.config;

import com.ShopNook.ecommerce.entity.Product;
import com.ShopNook.ecommerce.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.http.HttpMethod;


import java.util.*;

@Configuration
public class DataRestConfiguration implements RepositoryRestConfigurer
{

    // Autowire JPA entity manager
    private EntityManager entityManager;

    @Autowired
    public DataRestConfiguration(EntityManager myEntityManager)
    {
        entityManager = myEntityManager;
    }
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

        // calling internal helper method
        exposeIds(config);
    }
    private void exposeIds(RepositoryRestConfiguration config)
    {
        // expose entity ids

        // get a list of all entity classes fromm the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // create an array of the entity types
        List<Class> entityOfClasses = new ArrayList<>();

        // get the entity types for the entities
        for (EntityType entityType: entities)
        {
            entityOfClasses.add(entityType.getJavaType());
        }

        // expose the entity ids for the array of entity/domain types
        Class[] domainTypes = entityOfClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
