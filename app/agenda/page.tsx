"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, Calendar, MapPin, Plus } from "lucide-react";

// Dados de exemplo para a agenda
const weeklyEvents = [
  {
    id: 1,
    day: "Segunda-feira",
    events: [
      { id: 101, time: "20:00", title: "Ensaio Mile", location: "Templo" }
    ]
  },
  {
    id: 2,
    day: "Terça-feira",
    events: [
      { id: 102, time: "20:00", title: "Culto de Ensino", location: "Templo" }
    ]
  },
  {
    id: 3,
    day: "Quarta-feira",
    events: [
      { id: 103, time: "20:00", title: "Ensaio e Aulas de Música", location: "Sala 10 e 11" }
    ]
  },
  {
    id: 4,
    day: "Quinta-feira",
    events: [
      { id: 104, time: "20:00", title: "Culto de Libertação", location: "Templo" }
    ]
  },
  {
    id: 5,
    day: "Sexta-feira",
    events: [
      { id: 105, time: "20:00", title: "Encontro dos Departamentos", location: "A definir" }
    ]
  },
  {
    id: 7,
    day: "Domingo",
    events: [
      { id: 108, time: "08:00", title: "Oração", location: "Templo" },
      { id: 109, time: "09:00", title: "Escola Bíblica Dominical", location: "Templo" },
      { id: 110, time: "18:00", title: "Culto da Noite", location: "Templo" }
    ]
  }
];

const annualEvents = [
  {
    id: 1,
    month: "Janeiro",
    events: [
      { id: 201, date: "15/01", title: "Conferência de Líderes", description: "Treinamento anual para líderes e obreiros." }
    ]
  },
  {
    id: 2,
    month: "Fevereiro",
    events: [
      { id: 202, date: "20/02", title: "Reunião de Casais", description: "Momento especial para fortalecer os casamentos." }
    ]
  },
  {
    id: 3,
    month: "Março",
    events: [
      { id: 203, date: "08/03", title: "Celebração Dia da Mulher", description: "Evento especial para as mulheres da igreja." }
    ]
  },
  {
    id: 4,
    month: "Abril",
    events: [
      { id: 204, date: "09/04", title: "Celebração de Páscoa", description: "Culto especial de Páscoa." }
    ]
  },
  {
    id: 5,
    month: "Maio",
    events: [
      { id: 205, date: "14/05", title: "Celebração Dia das Mães", description: "Culto especial para as mães." }
    ]
  },
  {
    id: 6,
    month: "Junho",
    events: [
      { id: 206, date: "10/06", title: "Festa do fiel da Igreja", description: "Confraternização com comidas típicas e brincadeiras." }
    ]
  },
  {
    id: 7,
    month: "Julho",
    events: [
      { id: 207, date: "15/07", title: "Convivência de Jovens", description: "Retiro espiritual para os jovens da igreja." }
    ]
  },
  {
    id: 8,
    month: "Agosto",
    events: [
      { id: 208, date: "13/08", title: "Celebração Dia dos Pais", description: "Culto especial para os pais." }
    ]
  },
  {
    id: 9,
    month: "Setembro",
    events: [
      { id: 209, date: "20/09", title: "Aniversário da Igreja", description: "Celebração do aniversário da ADEV 11." }
    ]
  },
  {
    id: 10,
    month: "Outubro",
    events: [
      { id: 210, date: "12/10", title: "Conferência de Mulheres", description: "Evento focado para Mulheres serem edificadas." }
    ]
  },
  {
    id: 11,
    month: "Novembro",
    events: [
      { id: 211, date: "15/11", title: "Conferência de Homens", description: "Evento focado para Homens serem edificados." }
    ]
  },
  {
    id: 12,
    month: "Dezembro",
    events: [
      { id: 212, date: "31/12", title: "Culto da Virada", description: "Culto especial de Ano Novo." }
    ]
  }
];

export default function AgendaPage() {
  const [isAdmin, setIsAdmin] = useState(true); // Simulando um usuário administrador
  const [openDialog, setOpenDialog] = useState(false);
  const [eventType, setEventType] = useState<"weekly" | "annual">("weekly");

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Agenda ADEV 11</h1>
          <p className="text-muted-foreground">
            Confira nossa programação semanal e anual de atividades
          </p>
        </div>
        
        {isAdmin && (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Adicionar Evento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Evento</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes do evento para adicioná-lo à agenda.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-type" className="text-right">
                    Tipo
                  </Label>
                  <select 
                    id="event-type" 
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as "weekly" | "annual")}
                  >
                    <option value="weekly">Semanal</option>
                    <option value="annual">Anual</option>
                  </select>
                </div>
                
                {eventType === "weekly" ? (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="day" className="text-right">
                        Dia
                      </Label>
                      <select 
                        id="day" 
                        className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="Segunda-feira">Segunda-feira</option>
                        <option value="Terça-feira">Terça-feira</option>
                        <option value="Quarta-feira">Quarta-feira</option>
                        <option value="Quinta-feira">Quinta-feira</option>
                        <option value="Sexta-feira">Sexta-feira</option>
                        <option value="Sábado">Sábado</option>
                        <option value="Domingo">Domingo</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="time" className="text-right">
                        Horário
                      </Label>
                      <Input id="time" type="time" className="col-span-3" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="month" className="text-right">
                        Mês
                      </Label>
                      <select 
                        id="month" 
                        className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="Janeiro">Janeiro</option>
                        <option value="Fevereiro">Fevereiro</option>
                        <option value="Março">Março</option>
                        <option value="Abril">Abril</option>
                        <option value="Maio">Maio</option>
                        <option value="Junho">Junho</option>
                        <option value="Julho">Julho</option>
                        <option value="Agosto">Agosto</option>
                        <option value="Setembro">Setembro</option>
                        <option value="Outubro">Outubro</option>
                        <option value="Novembro">Novembro</option>
                        <option value="Dezembro">Dezembro</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Data
                      </Label>
                      <Input id="date" type="text" placeholder="DD/MM" className="col-span-3" />
                    </div>
                  </>
                )}
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Título
                  </Label>
                  <Input id="title" className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Local
                  </Label>
                  <Input id="location" className="col-span-3" />
                </div>
                
                {eventType === "annual" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Descrição
                    </Label>
                    <Textarea id="description" className="col-span-3" />
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button type="submit" onClick={() => setOpenDialog(false)}>Salvar Evento</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <Tabs defaultValue="weekly">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="weekly">Agenda Semanal</TabsTrigger>
          <TabsTrigger value="annual">Agenda Anual</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly" className="space-y-8">
          {weeklyEvents.map((day) => (
            <div key={day.id}>
              <h2 className="text-xl font-semibold mb-4">{day.day}</h2>
              {day.events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {day.events.map((event) => (
                    <Card key={event.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Nenhum evento programado para este dia.</p>
              )}
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="annual" className="space-y-8">
          {annualEvents.map((month) => (
            <div key={month.id}>
              <h2 className="text-xl font-semibold mb-4">{month.month}</h2>
              {month.events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {month.events.map((event) => (
                    <Card key={event.id}>
                      <CardHeader className="pb-2">
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </CardDescription>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{event.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Nenhum evento programado para este mês.</p>
              )}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}