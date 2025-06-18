import React, { useState } from 'react';
import { translateCodeWithGemini } from '@/api/gemini';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C#',
  'C++',
  'Go',
  'Ruby',
  'PHP',
  'Swift',
  'Kotlin',
  'Rust',
  'Scala',
  'Dart',
  'Haskell',
  'Perl',
  'Objective-C',
  'Shell',
  'SQL',
  'Other',
];

const CodeTranslator: React.FC = () => {
  const [inputCode, setInputCode] = useState('');
  const [sourceLang, setSourceLang] = useState('JavaScript');
  const [targetLang, setTargetLang] = useState('Python');
  const [translatedCode, setTranslatedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    setLoading(true);
    setError(null);
    setTranslatedCode('');
    try {
      const result = await translateCodeWithGemini(inputCode, sourceLang, targetLang);
      setTranslatedCode(result);
    } catch (err: any) {
      setError('Translation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="code-translator" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light mb-4 text-foreground">AI Code Translator</h2>
          <p className="text-muted-foreground">
            Paste your code, select source and target languages, and let Gemini translate it for you!
          </p>
        </div>
        <Card className="shadow-lg bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="mb-4">
              <label className="block mb-2 font-light">Input Code</label>
              <Textarea
                value={inputCode}
                onChange={e => setInputCode(e.target.value)}
                placeholder="Paste your code here..."
                rows={8}
                className="font-mono"
                disabled={loading}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block mb-1 font-light">Source Language</label>
                <select
                  className="w-full border rounded px-3 py-2 bg-background"
                  value={sourceLang}
                  onChange={e => setSourceLang(e.target.value)}
                  disabled={loading}
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-light">Target Language</label>
                <select
                  className="w-full border rounded px-3 py-2 bg-background"
                  value={targetLang}
                  onChange={e => setTargetLang(e.target.value)}
                  disabled={loading}
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>
            <Button
              onClick={handleTranslate}
              disabled={loading || !inputCode.trim() || sourceLang === targetLang}
              className="w-full mb-4"
            >
              {loading ? 'Translating...' : 'Translate'}
            </Button>
            {error && <div className="text-destructive mb-2">{error}</div>}
            {translatedCode && (
              <div className="mt-6">
                <label className="block mb-2 font-light">Translated Code</label>
                <Textarea
                  value={translatedCode}
                  readOnly
                  rows={8}
                  className="font-mono bg-muted"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CodeTranslator; 