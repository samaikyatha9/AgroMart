package com.agromart.backend.util;

import com.agromart.backend.entity.Category;
import com.agromart.backend.entity.Product;
import com.agromart.backend.entity.Role;
import com.agromart.backend.entity.User;
import com.agromart.backend.repository.CategoryRepository;
import com.agromart.backend.repository.ProductRepository;
import com.agromart.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           CategoryRepository categoryRepository,
                           ProductRepository productRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        initUsers();
        initCategoriesAndProducts();
    }

    private void initUsers() {
        if (!userRepository.existsByEmail("admin@agromart.com")) {
            User admin = new User(
                    "AgroMart Administrator",
                    "admin@agromart.com",
                    passwordEncoder.encode("admin123"),
                    "+91 9876543210",
                    Role.ADMIN,
                    "Agri Business Hub, Sector 4",
                    "New Delhi",
                    "Delhi",
                    "110001"
            );
            userRepository.save(admin);
            logger.info("Created default Admin user: admin@agromart.com");
        }

        if (!userRepository.existsByEmail("seller@agromart.com")) {
            User seller = new User(
                    "Kisan Krishi Kendra",
                    "seller@agromart.com",
                    passwordEncoder.encode("seller123"),
                    "+91 9123456780",
                    Role.SELLER,
                    "Kisan Mandi Yard, Plot 12",
                    "Pune",
                    "Maharashtra",
                    "411001"
            );
            userRepository.save(seller);
            logger.info("Created default Seller user: seller@agromart.com");
        }

        if (!userRepository.existsByEmail("customer@agromart.com")) {
            User customer = new User(
                    "Ramesh Patel",
                    "customer@agromart.com",
                    passwordEncoder.encode("customer123"),
                    "+91 9988776655",
                    Role.CUSTOMER,
                    "Green Farm Estate, Post Box 45",
                    "Ahmedabad",
                    "Gujarat",
                    "380001"
            );
            userRepository.save(customer);
            logger.info("Created default Customer user: customer@agromart.com");
        }
    }

    private void initCategoriesAndProducts() {
        if (categoryRepository.count() > 0) {
            return;
        }

        Map<String, Category> categories = new HashMap<>();

        // 1. Seeds
        Category seeds = categoryRepository.save(new Category(
                "Seeds",
                "High-yielding hybrid, heirloom and organic seeds for crops, fruits, and vegetables.",
                "https://images.unsplash.com/photo-1592417817098-8f3d6eb2252a?auto=format&fit=crop&w=600&q=80"
        ));
        categories.put("Seeds", seeds);

        // 2. Fertilizers
        Category fertilizers = categoryRepository.save(new Category(
                "Fertilizers",
                "Organic compost, bio-fertilizers, NPK, and micronutrient blends for superior soil vitality.",
                "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80"
        ));
        categories.put("Fertilizers", fertilizers);

        // 3. Pesticides
        Category pesticides = categoryRepository.save(new Category(
                "Pesticides",
                "Eco-friendly biopesticides, natural neem oils, and targeted crop protection solutions.",
                "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80"
        ));
        categories.put("Pesticides", pesticides);

        // 4. Farming Tools
        Category tools = categoryRepository.save(new Category(
                "Farming Tools",
                "Durable manual implements, weeding hoes, sickles, pruning tools, and harvesting gear.",
                "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80"
        ));
        categories.put("Farming Tools", tools);

        // 5. Irrigation
        Category irrigation = categoryRepository.save(new Category(
                "Irrigation",
                "Water-saving drip irrigation kits, sprinkler systems, emitters, and micro-sprayers.",
                "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80"
        ));
        categories.put("Irrigation", irrigation);

        // 6. Gardening
        Category gardening = categoryRepository.save(new Category(
                "Gardening",
                "Urban gardening supplies, potting soil mixes, grow bags, and indoor plant care kits.",
                "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"
        ));
        categories.put("Gardening", gardening);

        // 7. Agricultural Equipment
        Category equipment = categoryRepository.save(new Category(
                "Agricultural Equipment",
                "Power tillers, battery-operated knapsack sprayers, seeders, and modern machinery.",
                "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80"
        ));
        categories.put("Agricultural Equipment", equipment);

        User seller = userRepository.findByEmail("seller@agromart.com").orElse(null);
        if (seller == null) {
            return;
        }

        // Add Realistic Sample Products
        productRepository.save(new Product(
                "Golden Harvest Hybrid Wheat Seeds (HD-2967)",
                "High-yielding, rust-resistant certified hybrid wheat seeds designed for optimal tillering and grain weight.",
                new BigDecimal("450.00"),
                120,
                "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
                categories.get("Seeds"),
                seller,
                "KrishiGold",
                "10 kg Bag"
        ));

        productRepository.save(new Product(
                "Premium Hybrid Tomato Seeds (Abhinav F1)",
                "Profound disease resistance, uniform deep red fruits, high shelf life, and prolonged harvesting period.",
                new BigDecimal("320.00"),
                85,
                "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80",
                categories.get("Seeds"),
                seller,
                "Seminis",
                "50 g Packet"
        ));

        productRepository.save(new Product(
                "Pure Organic Vermicompost Fertilizer",
                "100% pure organic earthworm castings packed with humic acid, bio-enzymes, and essential micro-nutrients.",
                new BigDecimal("299.00"),
                200,
                "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80",
                categories.get("Fertilizers"),
                seller,
                "EarthBloom",
                "25 kg Bag"
        ));

        productRepository.save(new Product(
                "Water Soluble NPK 19:19:19 Foliar Fertilizer",
                "Fast-acting 100% water-soluble nutrient formulation for foliar spray and fertigation in fruit and vegetable crops.",
                new BigDecimal("380.00"),
                60,
                "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80",
                categories.get("Fertilizers"),
                seller,
                "NutriGrow",
                "1 kg Pack"
        ));

        productRepository.save(new Product(
                "Cold-Pressed Cold-Pure Organic Neem Oil (10,000 PPM)",
                "Broad-spectrum natural pest deterrent effective against whiteflies, aphids, mites, and powdery mildew.",
                new BigDecimal("420.00"),
                50,
                "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
                categories.get("Pesticides"),
                seller,
                "BioShield",
                "1 Liter Bottle"
        ));

        productRepository.save(new Product(
                "Heavy-Duty Ergonomic Garden Weeding Hoe & Cultivator",
                "Dual-head carbon steel tool with forged rust-proof teeth and non-slip rubber grip handle.",
                new BigDecimal("550.00"),
                40,
                "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80",
                categories.get("Farming Tools"),
                seller,
                "AgriTough",
                "1 Piece"
        ));

        productRepository.save(new Product(
                "16L Battery Operated 2-in-1 Knapsack Sprayer",
                "Powerful 12V 8AH rechargeable battery sprayer with brass telescopic lance and multiple spray nozzle attachments.",
                new BigDecimal("2499.00"),
                25,
                "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80",
                categories.get("Agricultural Equipment"),
                seller,
                "PowerMist",
                "1 Unit"
        ));

        productRepository.save(new Product(
                "Complete Drip Irrigation Kit for 100 Plants",
                "Water-saving automatic micro-irrigation system with 16mm main line, drip emitters, connectors, and punch tool.",
                new BigDecimal("1199.00"),
                35,
                "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80",
                categories.get("Irrigation"),
                seller,
                "DropWise",
                "1 Complete Kit"
        ));

        productRepository.save(new Product(
                "Enriched Organic Potting Mix with Coco Peat & Perlite",
                "Ready-to-use sterilized potting substrate with high water retention and superb root aeration for terrace and balcony gardens.",
                new BigDecimal("349.00"),
                75,
                "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
                categories.get("Gardening"),
                seller,
                "FloraBloom",
                "10 kg Bag"
        ));

        logger.info("Successfully pre-seeded 7 categories and 9 agricultural products.");
    }
}
