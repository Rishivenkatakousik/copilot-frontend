"use client";

import { useState, useEffect, useCallback, useMemo, useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CodeLanguage, GenerateResponse } from "@/shared/schema";
import type { PromptHistory } from "@/shared/schema";
import { useTheme } from "@/components/theme-proovider";
import { AppHeader } from "@/components/app-header";
import { PromptInput } from "@/components/prompt-input";
import { PromptHistory as PromptHistoryComponent } from "@/components/prompt-history";
import { CodeOutput } from "@/components/code-output";

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState<CodeLanguage>("python");
  const [history, setHistory] = useState<PromptHistory[]>([]);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  // Load history from localStorage only once
  useEffect(() => {
    const saved = localStorage.getItem("promptHistory");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed);
      } catch (e) {
        console.error("Failed to parse history:", e);
        localStorage.removeItem("promptHistory");
      }
    }
  }, []);

  // Save history to localStorage with debouncing
  useEffect(() => {
    if (history.length === 0) return;
    
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem("promptHistory", JSON.stringify(history));
      } catch (e) {
        console.error("Failed to save history:", e);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [history]);

  const generateMutation = useMutation({
    mutationFn: async (data: { prompt: string; language: CodeLanguage }) => {
      const res = await apiRequest("POST", "/api/generate", data);
      return await res.json() as GenerateResponse;
    },
    onSuccess: (data, variables) => {
      startTransition(() => {
        setGeneratedCode(data.code);
        setCurrentLanguage(variables.language);
        
        const newHistoryItem: PromptHistory = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          prompt: variables.prompt,
          language: variables.language,
          code: data.code,
          timestamp: Date.now(),
        };
        
        setHistory((prev) => [newHistoryItem, ...prev.slice(0, 49)]); // Limit to 50 items
      });
      
      toast({
        title: "Code generated successfully!",
        description: "Your code is ready to use.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: "There was an error generating code. Please try again.",
      });
    },
  });

  const handleGenerate = useCallback((prompt: string, language: CodeLanguage) => {
    if (!prompt.trim()) {
      toast({
        variant: "destructive",
        title: "Empty prompt",
        description: "Please enter a prompt to generate code.",
      });
      return;
    }
    generateMutation.mutate({ prompt, language });
  }, [generateMutation, toast]);

  const handleCopy = useCallback(async () => {
    if (!generatedCode) return;
    
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied to clipboard!",
        description: "Code has been copied successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Failed to copy code to clipboard.",
      });
    }
  }, [generatedCode, toast]);

  const handleHistoryClick = useCallback((item: PromptHistory) => {
    startTransition(() => {
      setGeneratedCode(item.code);
      setCurrentLanguage(item.language);
    });
  }, []);

  const handleDeleteHistory = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    toast({
      title: "History cleared",
      description: "All prompt history has been deleted.",
    });
  }, [toast]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <AppHeader theme={theme} onToggleTheme={toggleTheme} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Input & History */}
        <div className="w-full lg:w-2/5 flex flex-col border-r overflow-hidden">
          <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
            <PromptInput
              onGenerate={handleGenerate}
              isGenerating={generateMutation.isPending}
            />

            <Separator />

            <PromptHistoryComponent
              history={history}
              onHistoryClick={handleHistoryClick}
              onDeleteHistory={handleDeleteHistory}
              onClearHistory={handleClearHistory}
            />
          </div>
        </div>

        {/* Right Panel - Code Output (Desktop) */}
        <div className="hidden lg:flex flex-1 flex-col overflow-hidden">
          <CodeOutput
            code={generatedCode}
            language={currentLanguage}
            isGenerating={generateMutation.isPending}
            theme={theme}
            onCopy={handleCopy}
            copied={copied}
          />
        </div>
      </div>

      {/* Mobile Code Output */}
      <div className="lg:hidden p-6 border-t bg-background">
        <CodeOutput
          code={generatedCode}
          language={currentLanguage}
          isGenerating={generateMutation.isPending}
          theme={theme}
          onCopy={handleCopy}
          copied={copied}
        />
      </div>
    </div>
  );
}
