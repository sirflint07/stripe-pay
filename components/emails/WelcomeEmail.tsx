import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Button,
  Img,
  Row,
  Column,
  Link,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
  url: string;
}

const WelcomeEmail = ({ name, url }: WelcomeEmailProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Welcome to CourseKingdom - Your learning journey begins today! 🎓</Preview>
      
      <Body style={main}>
        <Container style={container}>
          
          <Section style={header}>
            <Row>
              <Column align="center">
                <Img
                  src="https://placehold.co/200x50/8B5CF6/white?text=CourseKingdom&font=montserrat"
                  width="200"
                  height="50"
                  alt="CourseKingdom"
                  style={logo}
                />
              </Column>
            </Row>
          </Section>

          <Section style={heroSection}>
            <Img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop"
              width="560"
              height="200"
              alt="Students learning"
              style={heroImage}
            />
          </Section>

          <Section style={contentSection}>
            <Heading style={mainHeading}>
              Welcome aboard, {name}! 🚀
            </Heading>
            
            <Text style={greeting}>
              We are absolutely thrilled to have you join the CourseKingdom community!
            </Text>
            
            <Text style={paragraph}>
              You have just taken the first step toward transforming your career with 
              industry-leading courses taught by expert instructors. Your learning 
              journey starts now, and we are here to support you every step of the way.
            </Text>

            
            <Section style={featuresGrid}>
              <Row style={featureRow}>
                <Column style={featureColumn}>
                  <div style={featureCard}>
                    <Img
                      src="https://placehold.co/40x40/8B5CF6/white?text=📚"
                      width="40"
                      height="40"
                      alt="Courses"
                      style={featureIcon}
                    />
                    <Text style={featureTitle}>100+ Courses</Text>
                    <Text style={featureDesc}>
                      From beginner to advanced, we have got you covered
                    </Text>
                  </div>
                </Column>
                
                <Column style={featureColumn}>
                  <div style={featureCard}>
                    <Img
                      src="https://placehold.co/40x40/8B5CF6/white?text=👨‍🏫"
                      width="40"
                      height="40"
                      alt="Instructors"
                      style={featureIcon}
                    />
                    <Text style={featureTitle}>Expert Instructors</Text>
                    <Text style={featureDesc}>
                      Learn from industry professionals
                    </Text>
                  </div>
                </Column>
              </Row>
              
              <Row style={featureRow}>
                <Column style={featureColumn}>
                  <div style={featureCard}>
                    <Img
                      src="https://placehold.co/40x40/8B5CF6/white?text=🎓"
                      width="40"
                      height="40"
                      alt="Certificates"
                      style={featureIcon}
                    />
                    <Text style={featureTitle}>Certificates</Text>
                    <Text style={featureDesc}>
                      Earn verified certificates upon completion
                    </Text>
                  </div>
                </Column>
                
                <Column style={featureColumn}>
                  <div style={featureCard}>
                    <Img
                      src="https://placehold.co/40x40/8B5CF6/white?text=💬"
                      width="40"
                      height="40"
                      alt="Community"
                      style={featureIcon}
                    />
                    <Text style={featureTitle}>Community</Text>
                    <Text style={featureDesc}>
                      Connect with fellow learners worldwide
                    </Text>
                  </div>
                </Column>
              </Row>
            </Section>

            <Section style={categoriesSection}>
              <Heading as="h2" style={sectionHeading}>
                Popular Categories
              </Heading>
              
              <Row style={categoriesRow}>
                <Column style={categoryColumn}>
                  <div style={categoryPill}>Web Development</div>
                </Column>
                <Column style={categoryColumn}>
                  <div style={categoryPill}>Data Science</div>
                </Column>
              </Row>
              
              <Row style={categoriesRow}>
                <Column style={categoryColumn}>
                  <div style={categoryPill}>UI/UX Design</div>
                </Column>
                <Column style={categoryColumn}>
                  <div style={categoryPill}>Business & Marketing</div>
                </Column>
              </Row>
            </Section>

            <Hr style={divider} />

            <Section style={ctaSection}>
              <Text style={ctaText}>
                Ready to start your learning journey?
              </Text>
              
              <Button href={url} style={primaryButton}>
                Explore Courses Now
              </Button>
              
              <Text style={smallText}>
                or paste this link into your browser: {url}
              </Text>
            </Section>

            <Hr style={divider} />

            {/* Testimonial */}
            <Section style={testimonialSection}>
              <Text style={testimonialText}>
                CourseKingdom transformed my career! The courses are comprehensive, 
                instructors are amazing, and the community support is incredible.
              </Text>
              <Text style={testimonialAuthor}>
                — Sarah Johnson, Web Developer
              </Text>
            </Section>
          </Section>

          <Section style={footer}>
            <Row>
              <Column align="center">
                <Link href="https://coursekingdom.com/about" style={footerLink}>
                  About Us
                </Link>
                <span style={footerDivider}>•</span>
                <Link href="https://coursekingdom.com/help" style={footerLink}>
                  Help Center
                </Link>
                <span style={footerDivider}>•</span>
                <Link href="https://coursekingdom.com/terms" style={footerLink}>
                  Terms
                </Link>
                <span style={footerDivider}>•</span>
                <Link href="https://coursekingdom.com/privacy" style={footerLink}>
                  Privacy
                </Link>
              </Column>
            </Row>
            
            <Row style={socialRow}>
              <Column align="center">
                <Link href="https://twitter.com/coursekingdom" style={socialLink}>
                  <Img
                    src="https://placehold.co/32x32/1DA1F2/white?text=𝕏"
                    width="32"
                    height="32"
                    alt="Twitter"
                    style={socialIcon}
                  />
                </Link>
                <Link href="https://linkedin.com/company/coursekingdom" style={socialLink}>
                  <Img
                    src="https://placehold.co/32x32/0A66C2/white?text=in"
                    width="32"
                    height="32"
                    alt="LinkedIn"
                    style={socialIcon}
                  />
                </Link>
                <Link href="https://youtube.com/coursekingdom" style={socialLink}>
                  <Img
                    src="https://placehold.co/32x32/FF0000/white?text=YT"
                    width="32"
                    height="32"
                    alt="YouTube"
                    style={socialIcon}
                  />
                </Link>
              </Column>
            </Row>
            
            <Text style={copyright}>
              © {currentYear} CourseKingdom, Inc. All rights reserved.
            </Text>
            <Text style={address}>
              123 Learning Avenue, Education City, EC 12345
            </Text>
            <Text style={unsubscribe}>
              You received this email because you signed up for CourseKingdom. 
              If you would prefer not to receive these emails, you can{' '}
              <Link href="https://coursekingdom.com/unsubscribe" style={unsubscribeLink}>
                unsubscribe here
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

const main = {
  backgroundColor: "#f4f4f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
};

const header = {
  backgroundColor: "#ffffff",
  padding: "24px 0 8px",
  borderBottom: "1px solid #e2e8f0",
};

const logo = {
  margin: "0 auto",
};

const heroSection = {
  padding: "0",
};

const heroImage = {
  width: "100%",
  height: "auto",
  objectFit: "cover" as const,
  display: "block",
};

const contentSection = {
  padding: "32px 24px",
};

const mainHeading = {
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.3",
  color: "#1e293b",
  margin: "0 0 16px",
  textAlign: "center" as const,
};

const greeting = {
  fontSize: "18px",
  fontWeight: "500",
  color: "#334155",
  margin: "0 0 16px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#475569",
  margin: "0 0 24px",
};

const featuresGrid = {
  margin: "32px 0",
};

const featureRow = {
  marginBottom: "16px",
};

const featureColumn = {
  width: "50%",
  padding: "0 8px",
  verticalAlign: "top" as const,
};

const featureCard = {
  padding: "16px",
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  textAlign: "center" as const,
};

const featureIcon = {
  margin: "0 auto 12px",
  display: "block",
  borderRadius: "8px",
};

const featureTitle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1e293b",
  margin: "0 0 4px",
};

const featureDesc = {
  fontSize: "14px",
  color: "#64748b",
  margin: "0",
  lineHeight: "1.4",
};

const categoriesSection = {
  margin: "32px 0",
};

const sectionHeading = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1e293b",
  margin: "0 0 16px",
  textAlign: "center" as const,
};

const categoriesRow = {
  marginBottom: "12px",
};

const categoryColumn = {
  width: "50%",
  padding: "0 8px",
};

const categoryPill = {
  backgroundColor: "#f1f5f9",
  padding: "8px 16px",
  borderRadius: "20px",
  fontSize: "14px",
  color: "#334155",
  textAlign: "center" as const,
  border: "1px solid #e2e8f0",
};

const divider = {
  borderColor: "#e2e8f0",
  margin: "32px 0",
};

const ctaSection = {
  textAlign: "center" as const,
};

const ctaText = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1e293b",
  margin: "0 0 20px",
};

const primaryButton = {
  backgroundColor: "#8B5CF6",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 32px",
  borderRadius: "8px",
  marginBottom: "16px",
};

const smallText = {
  fontSize: "14px",
  color: "#64748b",
  margin: "0",
};

const testimonialSection = {
  backgroundColor: "#f8fafc",
  padding: "24px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  marginTop: "24px",
};

const testimonialText = {
  fontSize: "14px",
  fontStyle: "italic",
  color: "#475569",
  margin: "0 0 8px",
  lineHeight: "1.6",
};

const testimonialAuthor = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#334155",
  margin: "0",
  textAlign: "right" as const,
};

const footer = {
  backgroundColor: "#f8fafc",
  padding: "32px 24px 24px",
  borderTop: "1px solid #e2e8f0",
};

const footerLink = {
  color: "#64748b",
  fontSize: "14px",
  textDecoration: "none",
  margin: "0 8px",
};

const footerDivider = {
  color: "#cbd5e1",
  fontSize: "14px",
};

const socialRow = {
  marginTop: "24px",
  marginBottom: "24px",
};

const socialLink = {
  margin: "0 8px",
  textDecoration: "none",
};

const socialIcon = {
  borderRadius: "50%",
  verticalAlign: "middle" as const,
};

const copyright = {
  fontSize: "14px",
  color: "#94a3b8",
  margin: "0 0 4px",
  textAlign: "center" as const,
};

const address = {
  fontSize: "12px",
  color: "#94a3b8",
  margin: "0 0 4px",
  textAlign: "center" as const,
};

const unsubscribe = {
  fontSize: "12px",
  color: "#94a3b8",
  margin: "16px 0 0",
  textAlign: "center" as const,
  lineHeight: "1.5",
};

const unsubscribeLink = {
  color: "#8B5CF6",
  textDecoration: "underline",
};