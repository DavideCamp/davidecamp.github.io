
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AI/ML',
    'Next.js', 'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker'
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate developer with 5+ years of experience building scalable applications and AI-powered solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-left">
            <Card className="p-8 border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6">My Journey</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    I started my journey in software development with a fascination for how technology 
                    can solve real-world problems. Over the years, I've evolved from a curious beginner 
                    to a seasoned developer specializing in full-stack web development and AI integration.
                  </p>
                  <p>
                    My expertise spans modern web technologies, with a particular focus on React, Node.js, 
                    and Python. I'm passionate about creating intuitive user experiences and building 
                    robust, scalable backend systems.
                  </p>
                  <p>
                    Recently, I've been diving deep into AI and machine learning, exploring how these 
                    technologies can enhance traditional web applications and create entirely new 
                    possibilities for user interaction.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="animate-fade-up">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="px-4 py-2 text-sm hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
              <CardContent className="p-0">
                <h4 className="text-lg font-semibold mb-3">What I'm Currently Working On</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Building AI-powered web applications</li>
                  <li>• Contributing to open-source projects</li>
                  <li>• Learning advanced machine learning techniques</li>
                  <li>• Mentoring junior developers</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
