"use client"

import { ArrowLeft, Brain } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { SymptomForm, SymptomFormData } from "@/components/symptom-form"
import { PredictionResults } from "@/components/prediction-results"
import { useCustomToast } from "@/hooks/useCustomToast"
import { DSData, usePost } from "@/hooks/use-request"
import { API_BASE_URL } from "@/lib/constants"
import ProcessLoader from "@/components/process-loader"
import { useRouter } from "next/navigation"

export default function SymptomAnalysisPage() {
  const [activeTab, setActiveTab] = useState("input")
  const [predictionComplete, setPredictionComplete] = useState(false);
  const { showToast } = useCustomToast();
  const router = useRouter();
  const {status, data, error, loading: isPredicting, 
    clearResponseState,
    executePostRequest , 
  } = usePost<DSData>(`${API_BASE_URL}/api/diagnose`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // ✅ new state for medical record search
  const [patientRecord, setPatientRecord] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthday: "",
    contactNumber: "",
    motherMaidenName: ""
  });

  const handleAccessMedicalRecord = () => {
    if (!patientRecord.firstName || !patientRecord.lastName || !patientRecord.middleName) {
      showToast({
        title: "Missing required fields",
        description: "First, Middle, and Last Name are required.",
        variant: "destructive",
      });
      return;
    }

    showToast({
      title: "Medical Record Accessed",
      description: `Fetching record for ${patientRecord.firstName} ${patientRecord.lastName}...`,
    });
  };

  const [formData, setFormData] = useState<SymptomFormData>({
    age: "",
    gender: "",
    smoking: false,
    yellowFingers: false,
    anxiety: false,
    peerPressure: false,
    chronicDisease: false,
    fatigue: false,
    allergy: false,
    wheezing: false,
    alcohol: false,
    coughing: false,
    shortnessOfBreath: false,
    swallowingDifficulty: false,
    chestPain: false,
  })

  const handleFormDataChange = (data: SymptomFormData) => {
    setFormData(data)
  }

  const handleGeneratePrediction = () => {
    const hasSymptoms = Object.values(formData!).some((value) => value === true);
    const hasAgeAndGender = formData.age !== '' && formData.gender !== '';

    if (!hasSymptoms) {
      showToast({
        title: "No symptoms selected",
        description: "Please select at least one symptom to generate a prediction.",
        variant: "destructive",
      })
      return;
    }else if(!hasAgeAndGender){
      showToast({
        title: "Provide Age and Gender",
        description: "Please input age and gender to generate a prediction.",
        variant: "destructive",
      })
      return;
    }

    executePostRequest(formData);
  }

  useEffect(() => {
    if (status === 200 && activeTab !=="results") {
      const timer = setTimeout(() => {
        setActiveTab("results");
        setPredictionComplete(true)
        showToast({
          title: "Prediction complete",
          description: "Symptom analysis has been completed successfully.",
        })
      }, 0)
      return () => clearTimeout(timer)
    }

    if(error){
      showToast({
        title: "Analysis Error",
        description: "Something went wrong. Please try again later.",
        variant: 'destructive'
      })
      clearResponseState();
      return
    }
  }, [isPredicting])

  const handleBackToHome = () => {
    router.push("/")
  }

  return (
    <div className="container py-10">
      <Button
        variant="ghost"
        className="text-lumina-600 hover:bg-lumina-50 hover:text-lumina-700 -ml-4"
        onClick={handleBackToHome}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
      <div className="my-4 flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Image src="/images/lumina-logo.svg" width={32} height={32} alt="LUMINA logo" className="h-8 w-auto" />
          <h1 className="text-3xl font-bold">Symptom Analysis</h1>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="input" className="mt-6 space-y-6">
          <Card className="border-lumina-100">
            <CardHeader>
              <CardTitle>Access Patient Medical Records</CardTitle>
              <CardDescription>
                Retrieve complete medical history from all CAR healthcare facilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <input
                  type="text"
                  placeholder="First Name *"
                  className="border rounded-md px-3 py-2"
                  value={patientRecord.firstName}
                  onChange={(e) => setPatientRecord({ ...patientRecord, firstName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Middle Name *"
                  className="border rounded-md px-3 py-2"
                  value={patientRecord.middleName}
                  onChange={(e) => setPatientRecord({ ...patientRecord, middleName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Last Name *"
                  className="border rounded-md px-3 py-2"
                  value={patientRecord.lastName}
                  onChange={(e) => setPatientRecord({ ...patientRecord, lastName: e.target.value })}
                />
                <input
                  type="date"
                  className="border rounded-md px-3 py-2"
                  value={patientRecord.birthday}
                  onChange={(e) => setPatientRecord({ ...patientRecord, birthday: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Contact Number"
                  className="border rounded-md px-3 py-2"
                  value={patientRecord.contactNumber}
                  onChange={(e) => setPatientRecord({ ...patientRecord, contactNumber: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Mother's Maiden Name"
                  className="border rounded-md px-3 py-2"
                  value={patientRecord.motherMaidenName}
                  onChange={(e) => setPatientRecord({ ...patientRecord, motherMaidenName: e.target.value })}
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  className="bg-lumina-600 hover:bg-lumina-700 text-white"
                  onClick={handleAccessMedicalRecord}
                >
                  Access Medical Record
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Existing Symptom Form */}
          <Card className="border-lumina-100">
            <CardHeader>
              <CardTitle>Symptom & Demographic Information</CardTitle>
              <CardDescription>
                Enter patient information to predict lung cancer likelihood using our logistic regression model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SymptomForm onFormDataChange={handleFormDataChange} initialFormData={formData} />
            </CardContent>
          </Card>

          {isPredicting ? (
            <ProcessLoader />
          ) : (
            <div className="mt-6 flex justify-end">
              <Button
                className="bg-lumina-600 hover:bg-lumina-700 text-white"
                onClick={handleGeneratePrediction}
                disabled={isPredicting}
              >
                Generate Prediction
                <Brain className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="results" className="mt-6">
          <Card className="border-lumina-100">
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
              <CardDescription>Logistic regression model prediction based on symptom analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <PredictionResults {...data!}/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
