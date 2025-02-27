"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Plus, Edit, Trash2, Download, Filter, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

//Ajustar
const departamentos = [
  { id: 1, nome: "Mile", cor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  { id: 2, nome: "Cantina Kemuel", cor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  { id: 3, nome: "Cantina Samah", cor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
  { id: 4, nome: "Cantina Silóe", cor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  { id: 5, nome: "Cantina Gileade", cor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
  { id: 6, nome: "Intercessão", cor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300" },
  { id: 7, nome: "Portaria", cor: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300" },
  { id: 8, nome: "Multímidia", cor: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
  { id: 9, nome: "Direção do Culto", cor: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300" },
  { id: 10, nome: "Pregação", cor: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300" },
];

// Dados de exemplo para membros pra testarmos
const membrosData = [
  { id: 1, nome: "David dos Santos", departamentos: [5, 8] },
  { id: 2, nome: "Dilson Pereira", departamentos: [5, 8] },
  { id: 3, nome: "André Victor", departamentos: [1, 8] },
  { id: 4, nome: "Alexandre Nogueira", departamentos: [8] },
  { id: 5, nome: "Guilherme Borges", departamentos: [1] },
  { id: 6, nome: "Ana Karina", departamentos: [8] },
  { id: 7, nome: "Reginaldo Pereira", departamentos: [10] },
  { id: 8, nome: "Juninho Pereira", departamentos: [1] },
  { id: 9, nome: "Fernando Araujo", departamentos: [1] },
  { id: 10, nome: "Debora Kailany", departamentos: [1] },
  { id: 11, nome: "Pastora Neta", departamentos: [4] },
  { id: 12, nome: "Gleison Pereira", departamentos: [9] },
];

// Dados de exemplo para escalas
const escalasData = [
  {
    id: 1,
    departamento: 1,
    data: "2025-02-04",
    titulo: "Culto Domingo de Manhã",
    horario: "09:00",
    membros: [1, 6, 9],
    observacoes: "Oração às 8h"
  },
  {
    id: 2,
    departamento: 1,
    data: "2025-02-04",
    titulo: "Culto Domingo Noite",
    horario: "18:00",
    membros: [1, 6, 9],
    observacoes: "Ensaio às 11h"
  },
  {
    id: 3,
    departamento: 2,
    data: "2025-02-04",
    titulo: "Escola Bíblica Dominical",
    horario: "09:00",
    membros: [10],
    observacoes: "Tema: Parábolas de Jesus"
  },
  {
    id: 4,
    departamento: 3,
    data: "2025-02-04",
    titulo: "Recepção Culto Manhã",
    horario: "09:30",
    membros: [3, 9],
    observacoes: ""
  },
  {
    id: 5,
    departamento: 3,
    data: "2025-02-04",
    titulo: "Recepção Culto Noite",
    horario: "17:30",
    membros: [3],
    observacoes: ""
  },
  {
    id: 6,
    departamento: 4,
    data: "2025-02-04",
    titulo: "Mídia Culto Manhã",
    horario: "09:30",
    membros: [1],
    observacoes: "Preparar slides com antecedência"
  },
  {
    id: 7,
    departamento: 4,
    data: "2025-02-04",
    titulo: "Mídia Culto Noite",
    horario: "17:30",
    membros: [1, 2],
    observacoes: "Preparar slides com antecedência"
  },
  {
    id: 8,
    departamento: 5,
    data: "2025-02-04",
    titulo: "Diaconia Culto Manhã",
    horario: "09:30",
    membros: [10],
    observacoes: ""
  },
  {
    id: 9,
    departamento: 1,
    data: "2025-02-04",
    titulo: "Culto de Quinta",
    horario: "20:00",
    membros: [1, 9]
  },
  {
    id: 10,
    departamento: 6,
    data: "2025-02-04",
    titulo: "Cantina Siloé",
    horario: "18:30",
    membros: [8],
    observacoes: ""
  },
];

// Agrupar escalas por data
const escalasPorData = escalasData.reduce((acc, escala) => {
  if (!acc[escala.data]) {
    acc[escala.data] = [];
  }
  acc[escala.data].push(escala);
  return acc;
}, {} as Record<string, typeof escalasData>);

// Agrupar escalas por departamento
const escalasPorDepartamento = escalasData.reduce((acc, escala) => {
  if (!acc[escala.departamento]) {
    acc[escala.departamento] = [];
  }
  acc[escala.departamento].push(escala);
  return acc;
}, {} as Record<string, typeof escalasData>);

export default function EscalasPage() {
  const [selectedDepartamento, setSelectedDepartamento] = useState<string>("todos");
  const [openDialog, setOpenDialog] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    departamento: "",
    data: "",
    titulo: "",
    horario: "",
    membros: [] as string[],
    observacoes: ""
  });

  // Filtrar escalas por departamento
  const filteredEscalas = selectedDepartamento === "todos"
    ? escalasData
    : escalasData.filter(escala => escala.departamento === parseInt(selectedDepartamento));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleMembrosChange = (value: string) => {
    const membroId = parseInt(value);
    setFormData(prev => {
      const membros = [...prev.membros];
      if (membros.includes(value)) {
        return { ...prev, membros: membros.filter(m => m !== value) };
      } else {
        return { ...prev, membros: [...membros, value] };
      }
    });
  };

  const handleSubmit = () => {
    // Aqui será implementada a lógica para salvar a nova escala
    console.log("Nova escala:", formData);
    setOpenDialog(false);
    // Resetar o formulário
    setFormData({
      departamento: "",
      data: "",
      titulo: "",
      horario: "",
      membros: [],
      observacoes: ""
    });
  };

  const getDepartamentoNome = (id: number) => {
    const departamento = departamentos.find(d => d.id === id);
    return departamento ? departamento.nome : "";
  };

  const getDepartamentoCor = (id: number) => {
    const departamento = departamentos.find(d => d.id === id);
    return departamento ? departamento.cor : "";
  };

  const getMembroNome = (id: number) => {
    const membro = membrosData.find(m => m.id === id);
    return membro ? membro.nome : "";
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return format(data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const diaDaSemana = (dataString: string) => {
    const data = new Date(dataString);
    return format(data, "EEEE", { locale: ptBR });
  };

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Escalas de Serviço</h1>
          <p className="text-muted-foreground">
            Gerencie as escalas de serviço dos departamentos
          </p>
        </div>
        
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Nova Escala
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Criar Nova Escala</DialogTitle>
              <DialogDescription>
                Preencha os detalhes da escala de serviço.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departamento">Departamento</Label>
                  <Select onValueChange={(value) => handleSelectChange("departamento", value)}>
                    <SelectTrigger id="departamento">
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departamentos.map((departamento) => (
                        <SelectItem key={departamento.id} value={departamento.id.toString()}>
                          {departamento.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data">Data</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                          setDate(date);
                          if (date) {
                            setFormData(prev => ({ ...prev, data: format(date, "yyyy-MM-dd") }));
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título</Label>
                  <Input 
                    id="titulo" 
                    placeholder="Ex: Culto Domingo Manhã" 
                    value={formData.titulo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="horario">Horário</Label>
                  <Input 
                    id="horario" 
                    type="time" 
                    value={formData.horario}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Membros Escalados</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {formData.departamento && membrosData
                    .filter(membro => membro.departamentos.includes(parseInt(formData.departamento)))
                    .map((membro) => (
                      <div key={membro.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`membro-${membro.id}`}
                          value={membro.id}
                          checked={formData.membros.includes(membro.id.toString())}
                          onChange={(e) => handleMembrosChange(e.target.value)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor={`membro-${membro.id}`} className="text-sm">
                          {membro.nome}
                        </label>
                      </div>
                    ))}
                </div>
                {!formData.departamento && (
                  <p className="text-sm text-muted-foreground">Selecione um departamento para ver os membros disponíveis.</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Input 
                  id="observacoes" 
                  placeholder="Observações adicionais" 
                  value={formData.observacoes}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>Criar Escala</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="data">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <TabsList className="grid w-full md:w-auto grid-cols-2 mb-4 md:mb-0">
            <TabsTrigger value="data">Por Data</TabsTrigger>
            <TabsTrigger value="departamento">Por Departamento</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Select value={selectedDepartamento} onValueChange={setSelectedDepartamento}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os departamentos</SelectItem>
                {departamentos.map((departamento) => (
                  <SelectItem key={departamento.id} value={departamento.id.toString()}>
                    {departamento.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="data" className="space-y-8">
          {Object.entries(escalasPorData).sort().map(([data, escalas]) => (
            <Card key={data}>
              <CardHeader>
                <CardTitle className="flex flex-col md:flex-row md:items-center gap-2">
                  <span>{formatarData(data)}</span>
                  <Badge variant="outline" className="md:ml-2 w-fit capitalize">
                    {diaDaSemana(data)}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {escalas.length} {escalas.length === 1 ? 'escala' : 'escalas'} para este dia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Horário</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Departamento</TableHead>
                      <TableHead>Membros Escalados</TableHead>
                      <TableHead>Observações</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {escalas
                      .filter(escala => selectedDepartamento === "todos" || escala.departamento === parseInt(selectedDepartamento))
                      .sort((a, b) => a.horario.localeCompare(b.horario))
                      .map((escala) => (
                        <TableRow key={escala.id}>
                          <TableCell>{escala.horario}</TableCell>
                          <TableCell className="font-medium">{escala.titulo}</TableCell>
                          <TableCell>
                            <Badge className={cn("whitespace-nowrap", getDepartamentoCor(escala.departamento))}>
                              {getDepartamentoNome(escala.departamento)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {escala.membros.map((membroId) => (
                                <Badge key={membroId} variant="outline" className="whitespace-nowrap">
                                  {getMembroNome(membroId)}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{escala.observacoes}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="departamento" className="space-y-8">
          {Object.entries(escalasPorDepartamento)
            .filter(([depId, _]) => selectedDepartamento === "todos" || depId === selectedDepartamento)
            .map(([depId, escalas]) => {
              const departamentoId = parseInt(depId);
              return (
                <Card key={depId}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge className={cn("whitespace-nowrap", getDepartamentoCor(departamentoId))}>
                        {getDepartamentoNome(departamentoId)}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {escalas.length} {escalas.length === 1 ? 'escala' : 'escalas'} para este departamento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Horário</TableHead>
                          <TableHead>Título</TableHead>
                          <TableHead>Membros Escalados</TableHead>
                          <TableHead>Observações</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {escalas
                          .sort((a, b) => a.data.localeCompare(b.data) || a.horario.localeCompare(b.horario))
                          .map((escala) => (
                            <TableRow key={escala.id}>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span>{format(new Date(escala.data), "dd/MM/yyyy")}</span>
                                  <span className="text-xs text-muted-foreground capitalize">
                                    {diaDaSemana(escala.data)}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>{escala.horario}</TableCell>
                              <TableCell className="font-medium">{escala.titulo}</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {escala.membros.map((membroId) => (
                                    <Badge key={membroId} variant="outline" className="whitespace-nowrap">
                                      {getMembroNome(membroId)}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell>{escala.observacoes}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              );
            })}
        </TabsContent>
      </Tabs>
    </div>
  );
}