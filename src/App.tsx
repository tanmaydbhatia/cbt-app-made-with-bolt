import { useState } from 'react';
import { AuthProvider } from '@/lib/auth';
import AuthGate from '@/components/AuthGate';
import LandingPage from '@/pages/LandingPage';
import SetupPage from '@/pages/SetupPage';
import TestPage from '@/pages/TestPage';
import ResultsPage from '@/pages/ResultsPage';
import MyExamsPage from '@/pages/MyExamsPage';
import LibraryPage from '@/pages/LibraryPage';
import type { Page, TestConfig, TestResult, AnswerState } from '@/types';

function AppContent() {
  const [page, setPage] = useState<Page>('home');
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [savedAnswers, setSavedAnswers] = useState<Record<number, AnswerState>>({});

  const handleNavigate = (target: Page) => {
    setPage(target);
    window.scrollTo(0, 0);
  };

  const handleStartTest = (config: TestConfig) => {
    setTestConfig(config);
    setPage('test');
    window.scrollTo(0, 0);
  };

  const handleSubmitTest = (result: TestResult, answers: Record<number, AnswerState>) => {
    setTestResult(result);
    setSavedAnswers(answers);
    setPage('results');
    window.scrollTo(0, 0);
  };

  const handleRetake = () => {
    setTestResult(null);
    setSavedAnswers({});
    setPage('test');
    window.scrollTo(0, 0);
  };

  if (page === 'home') {
    return <LandingPage onNavigate={handleNavigate} />;
  }

  if (page === 'setup') {
    return <SetupPage onNavigate={handleNavigate} onStartTest={handleStartTest} />;
  }

  if (page === 'myexams') {
    return <MyExamsPage onNavigate={handleNavigate} onLoadExam={handleStartTest} />;
  }

  if (page === 'library') {
    return <LibraryPage onNavigate={handleNavigate} onLoadExam={handleStartTest} />;
  }

  if (page === 'test' && testConfig) {
    return (
      <TestPage
        config={testConfig}
        onSubmit={handleSubmitTest}
        onNavigate={handleNavigate}
      />
    );
  }

  if (page === 'results' && testConfig && testResult) {
    return (
      <ResultsPage
        config={testConfig}
        result={testResult}
        answers={savedAnswers}
        onNavigate={handleNavigate}
        onRetake={handleRetake}
      />
    );
  }

  return <LandingPage onNavigate={handleNavigate} />;
}

function App() {
  return (
    <AuthProvider>
      <AuthGate>
        <AppContent />
      </AuthGate>
    </AuthProvider>
  );
}

export default App;
