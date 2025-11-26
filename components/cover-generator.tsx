"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check, FileCode, Eye, Download } from "lucide-react"

interface FormData {
  schoolName: string
  career: string
  subject: string
  studentName: string
  date: string
}

export function CoverGenerator() {
  const [formData, setFormData] = useState<FormData>({
    schoolName: "",
    career: "",
    subject: "",
    studentName: "",
    date: "",
  })
  const [generatedCode, setGeneratedCode] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const generateHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portada - ${formData.subject}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px;
        }
        
        .cover {
            width: 100%;
            max-width: 600px;
            min-height: 800px;
            background: white;
            border: 3px solid #2c3e50;
            padding: 60px 50px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }
        
        .header {
            text-align: center;
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 30px;
        }
        
        .school-name {
            font-size: 1.8rem;
            font-weight: bold;
            color: #2c3e50;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 15px;
        }
        
        .career {
            font-size: 1.2rem;
            color: #34495e;
            font-style: italic;
        }
        
        .main-content {
            text-align: center;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 40px 0;
        }
        
        .subject-label {
            font-size: 1rem;
            color: #7f8c8d;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 15px;
        }
        
        .subject {
            font-size: 2.2rem;
            font-weight: bold;
            color: #2c3e50;
            line-height: 1.3;
        }
        
        .footer {
            border-top: 2px solid #2c3e50;
            padding-top: 30px;
        }
        
        .student-info {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        
        .student-section {
            text-align: left;
        }
        
        .date-section {
            text-align: right;
        }
        
        .label {
            font-size: 0.85rem;
            color: #7f8c8d;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
        }
        
        .value {
            font-size: 1.1rem;
            color: #2c3e50;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="cover">
        <div class="header">
            <h1 class="school-name">${formData.schoolName}</h1>
            <p class="career">${formData.career}</p>
        </div>
        
        <div class="main-content">
            <p class="subject-label">Materia</p>
            <h2 class="subject">${formData.subject}</h2>
        </div>
        
        <div class="footer">
            <div class="student-info">
                <div class="student-section">
                    <p class="label">Alumno</p>
                    <p class="value">${formData.studentName}</p>
                </div>
                <div class="date-section">
                    <p class="label">Fecha</p>
                    <p class="value">${formData.date}</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
    setGeneratedCode(html)
    setShowPreview(false)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadHTML = () => {
    const blob = new Blob([generatedCode], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `portada-${formData.subject.toLowerCase().replace(/\s+/g, "-") || "documento"}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "")

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-6">
          <FileCode className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Generador de Portadas HTML</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Crea portadas profesionales para tus trabajos académicos. Completa el formulario y obtén código HTML listo
          para usar con estilos incluidos.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Form Card */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Datos de la Portada</CardTitle>
            <CardDescription>Ingresa la información que aparecerá en tu portada</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="schoolName">Nombre de la Escuela</Label>
              <Input
                id="schoolName"
                name="schoolName"
                placeholder="Universidad Nacional Autónoma"
                value={formData.schoolName}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="career">Carrera</Label>
              <Input
                id="career"
                name="career"
                placeholder="Ingeniería en Sistemas Computacionales"
                value={formData.career}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Materia</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Programación Web"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentName">Nombre del Alumno</Label>
              <Input
                id="studentName"
                name="studentName"
                placeholder="Juan Pérez García"
                value={formData.studentName}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Input
                id="date"
                name="date"
                placeholder="25 de Noviembre de 2025"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>

            <Button className="w-full mt-4" size="lg" onClick={generateHTML} disabled={!isFormValid}>
              <FileCode className="w-4 h-4 mr-2" />
              Generar Código HTML
            </Button>
          </CardContent>
        </Card>

        {/* Output Card */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Código Generado</CardTitle>
                <CardDescription>Descarga o copia el código HTML</CardDescription>
              </div>
              {generatedCode && (
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
                    <Eye className="w-4 h-4 mr-2" />
                    {showPreview ? "Ver Código" : "Vista Previa"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </>
                    )}
                  </Button>
                  <Button size="sm" onClick={downloadHTML}>
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {generatedCode ? (
              showPreview ? (
                <div className="w-full h-[500px] border border-border rounded-lg overflow-hidden">
                  <iframe
                    srcDoc={generatedCode}
                    title="Preview"
                    className="w-full h-full"
                    sandbox="allow-same-origin"
                  />
                </div>
              ) : (
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[500px] text-sm">
                    <code className="text-foreground">{generatedCode}</code>
                  </pre>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] text-muted-foreground border-2 border-dashed border-border rounded-lg">
                <FileCode className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-center">
                  Completa el formulario y haz clic en
                  <br />
                  <span className="font-semibold">"Generar Código HTML"</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <div className="max-w-2xl mx-auto mt-12 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-4">¿Cómo usar el código?</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="p-4 bg-muted rounded-lg">
            <div className="font-bold text-foreground mb-1">1. Genera</div>
            Completa los campos y genera tu código HTML
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="font-bold text-foreground mb-1">2. Descarga o Copia</div>
            Descarga el archivo .html directamente o copia el código
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          El archivo descargado se puede abrir en cualquier navegador web
        </p>
      </div>
    </div>
  )
}
