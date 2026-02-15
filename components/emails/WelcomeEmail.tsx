import React from 'react'
import { Text, Html, Button } from '@react-email/components';

const WelcomeEmail = ({ name, url }: { name: string; url: string }) => {
  return (
    <Html>
      <Text>
        <h1>Welcome to CourseKindom, {name}</h1>
        <p>We&apos;re excited to have you on board. Click the link below to explore our courses and start learning:</p>
      </Text>
      <Button href={url}>
							Explore Courses
						</Button>
    </Html>
  )
}

export default WelcomeEmail;