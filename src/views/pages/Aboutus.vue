<template>
  <div class="about-us">
    <!-- Intro Section -->
    <div class="card intro-section">
      <div class="front">
        <h2>Welcome to Elysium Earth Essence</h2>
      </div>
      <div class="back">
        <p>
          Luxury fragrances committed to sustainability and a greener future.
        </p>
      </div>
    </div>

    <!-- Sustainability Section -->
    <div class="card sustainability-section">
      <div class="front">
        <h3>Sustainability at the Core</h3>
      </div>
      <div class="back">
        <p>
          Our fragrances are crafted using ethically sourced botanicals and sustainable materials.
        </p>
      </div>
    </div>

    <!-- Fragrance Quality Section -->
    <div class="card fragrance-quality-section">
      <div class="front">
        <h3>Premium Fragrance Quality</h3>
      </div>
      <div class="back">
        <p>
          Crafted by master perfumers using the finest ingredients.
        </p>
      </div>
    </div>

    <!-- Brand Comparison Section -->
    <div class="card brand-comparison-section">
      <div class="front">
        <h3>Comparison with Designer and Niche Brands</h3>
      </div>
      <div class="back">
        <p>
          Luxurious, sustainable fragrances that appeal to discerning consumers.
        </p>
      </div>
    </div>

    <!-- Purpose Section -->
    <div class="card purpose-section">
      <div class="front">
        <h3>Our Purpose</h3>
      </div>
      <div class="back">
        <p>
          Inspiring positive change in the fragrance industry and beyond.
        </p>
      </div>
    </div>

    <!-- Community Engagement Section -->
    <div class="card community-engagement-section">
      <div class="front">
        <h3>Community Engagement</h3>
      </div>
      <div class="back">
        <p>
          Actively involved in community initiatives and environmental advocacy.
        </p>
      </div>
    </div>

    <!-- Innovation Section -->
    <div class="card innovation-section">
      <div class="front">
        <h3>Innovation in Sustainability</h3>
      </div>
      <div class="back">
        <p>
          Pioneering innovative solutions for sustainable packaging and practices.
        </p>
      </div>
    </div>

    <!-- Ethical Practices Section -->
    <div class="card ethical-practices-section">
      <div class="front">
        <h3>Ethical Practices</h3>
      </div>
      <div class="back">
        <p>
          Committed to fair trade practices and ethical sourcing of raw materials.
        </p>
      </div>
    </div>

    <!-- Customer Satisfaction Section -->
    <div class="card customer-satisfaction-section">
      <div class="front">
        <h3>Customer Satisfaction</h3>
      </div>
      <div class="back">
        <p>
          Ensuring customer satisfaction through exceptional service and product quality.
        </p>
      </div>
    </div>

    <!-- Continuous Improvement Section -->
    <div class="card continuous-improvement-section">
      <div class="front">
        <h3>Continuous Improvement</h3>
      </div>
      <div class="back">
        <p>
          Striving for continuous improvement in sustainability practices and product innovation.
        </p>
      </div>
    </div>
    
    <!-- Social Responsibility Section -->
    <div class="card social-responsibility-section">
      <div class="front">
        <h3>Social Responsibility</h3>
      </div>
      <div class="back">
        <p>
          Supporting social causes and charitable organizations for a better world.
        </p>
      </div>
    </div>

    <!-- Transparency Section -->
    <div class="card transparency-section">
      <div class="front">
        <h3>Transparency</h3>
      </div>
      <div class="back">
        <p>
          Commitment to transparency in all aspects of our business practices.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElysiumEarthEssencePage',
};
</script>

<style scoped>
.about-us {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}

.card {
  width: calc(33.33% - 20px); 
  height: 200px; 
  margin: 10px;
  position: relative;
  perspective: 1000px; 
  transform-style: preserve-3d;
  transition: transform 0.5s;
  background-color: #f8f8f8; 
  border: 1px solid #ddd; 
  border-radius: 8px; 
}

.card:hover {
  transform: rotateY(180deg);
}

.card .front,
.card .back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.card .front {
  background-color: #f2f2f2;
}

.card .back {
  background-color: #e0e0e0;
  transform: rotateY(180deg);
}

h2, h3 {
  color: #333;
  margin-bottom: 15px;
  font-family: 'Arial', sans-serif; 
}

p {
  font-size: 14px; 
  line-height: 1.4;
  color: #666;
  font-family: 'Arial', sans-serif; 
}
</style>
