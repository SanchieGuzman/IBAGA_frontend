"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Brain, Menu, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RESEARCH_PAPER_LINK } from "@/lib/constants";

export default function Home() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScanAnalysis = () => {
    router.push("/scan-analysis");
    setMobileMenuOpen(false);
  };

  const handleSymptomAnalysis = () => {
    router.push("/symptom-analysis");
    setMobileMenuOpen(false);
  };

  const handleGetStarted = () => {
    router.push("/scan-analysis");
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 bg-white supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-lumina-600">
            <Image
              src="/images/iBAGA-logo.svg"
              width={32}
              height={32}
              alt="LUMINA logo"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold">iBAGA</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    iBAGA:{" "}
                    <span className="text-lumina-600">
                      Intelligent Broncho-Anatomical and Guided Assessment
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-black/60 md:text-xl">
                    Advanced lung cancer classification using 3D DenseNet on
                    multimodal data and symptom-based prediction through
                    logistic regression.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <Button
                    className="w-full bg-lumina-600 hover:bg-lumina-700 text-white"
                    onClick={handleSymptomAnalysis}
                  >
                    Symptom Analysis
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-lumina-600 text-lumina-600  hover:bg-lumina-50"
                    onClick={handleScanAnalysis}
                  >
                    Start Scan Analysis
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center w-full h-full  ">
                <Image
                  src="/images/iBAGA-logo.svg"
                  width={600}
                  height={600}
                  alt="LUMINA Lung Cancer Analysis"
                  className="w-full max-w-[400px] h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-2 md:py-0 bg-lumina-50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-10 md:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/images/iBAGA-small-logo.png"
              width={24}
              height={24}
              alt="LUMINA logo"
              className="h-6 w-auto"
            />
            <p className="text-center text-sm leading-loose text-black/60 md:text-left">
              © 2025 LUMINA. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-black/60">
            <Link
              href="/#"
              className="underline underline-offset-4 hover:text-lumina-600"
            >
              Terms of Service
            </Link>
            <Link
              href="/#"
              className="underline underline-offset-4 hover:text-lumina-600"
            >
              Privacy
            </Link>
            <Link
              href="/#"
              className="underline underline-offset-4 hover:text-lumina-600"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
