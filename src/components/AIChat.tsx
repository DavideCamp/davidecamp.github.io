
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

const AIChat = () => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = () => {
    if (!inputText.trim()) return;
    
    // Here you can add logic to show/hide or move elements based on user input
    console.log('User input:', inputText);
    
    // Clear the textarea after submission
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section id="ai-chat" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-4 text-foreground">
            AI Assistant
          </h2>
          <p className="text-muted-foreground">
            Ask anything and see the magic happen
          </p>
        </div>

        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="space-y-6">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your question or request here..."
                className="min-h-[120px] border-0 bg-background/50 text-base resize-none focus:ring-1 focus:ring-primary/20"
              />
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleSubmit}
                  disabled={!inputText.trim()}
                  className="bg-primary/90 hover:bg-primary text-primary-foreground px-8"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground text-center">
                Press Ctrl+Enter (⌘+Enter on Mac) to submit quickly
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AIChat;
