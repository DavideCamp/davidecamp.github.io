
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'React-native', 'Python', 'AI/ML',
    'Django', 'PostgreSQL', 'AWS', 'Docker'
  ];

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20 animate-fade-up">
          <h2 className="text-4xl font-light mb-6 text-foreground">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Passionate developer with 3 years of experience building scalable applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="animate-slide-left">
            <Card className="border-0 shadow-sm bg-card/30 backdrop-blur-sm">
              <CardContent className="">
                <h3 className="text-2xl font-light mb-8 text-foreground">My Journey</h3>
                <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
                  <p>
                    I started my journey in software development with a fascination for how technology
                    can solve real-world problems. Over the years, I've evolved from a University student of Computer Science
                    to a seasoned developer specializing in full-stack web development and AI integration.
                  </p>
                  <p>
                    My expertise spans modern web technologies, with a particular focus on React and Django. 
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

          <div className="animate-fade-up p-6 space-y-8">
            <div>
              <h3 className="text-2xl font-light mb-8 text-foreground">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-4 py-2 text-sm font-light border-foreground/10 hover:bg-foreground/5 transition-colors duration-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Card className="border-0 bg-muted/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <h4 className="text-lg font-light mb-4 text-foreground">What I'm Currently Working On</h4>
                <ul className="space-y-3 text-muted-foreground font-light">
                  <li>• Learning advanced machine learning techniques</li>
                  <li>• Building Web applications</li>
                  <li>• Contributing to open-source projects</li>
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
