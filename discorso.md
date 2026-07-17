# Discorso — Discussione di Tesi "AI e Customer Experience"

**Durata target:** ~10 minuti · 14 slide · ~40-50 secondi a slide
**Ritmo consigliato:** circa 120-130 parole al minuto (voce calma, da discussione di tesi, con pause dopo le citazioni in corsivo)

---

## 1 · Title — AI e Customer Experience
*(~50s)*

Buongiorno sono Pierluigi Camozzi e oggi vi presento la mia tesi di laurea triennale in Tecnologie per l'Industria Digitale. Il lavoro nasce da un'esperienza diretta sul campo: durante uno stage ho **progettato e sviluppato sistemi agentici conversazionali per applicazioni di Customer Experience in contesto enterprise**. In questi minuti vi racconterò cosa ho realizzato, come l'ho realizzato, e quali considerazioni più ampie questo percorso mi ha permesso di maturare sull'adozione dell'intelligenza artificiale nelle aziende.

## 2 · Plenitude «Lucilla»: il progetto più rilevante
*(~45s)*

Il progetto più rappresentativo del mio lavoro è "Lucilla", una demo di assistente vocale sviluppato per Eni Plenitude. Non si tratta di un chatbot, ma di un agente accessibile tramite una vera e propria telefonata: il cliente chiama, e Lucilla lo riconosce, dialoga con lui in linguaggio naturale e lo guida nell'invio dell'autolettura del contatore, in totale autonomia, dall'inizio alla fine. Questo progetto rappresenta bene il cambio di paradigma al centro della mia tesi: *si passa da un agente che consiglia a un agente che opera* concretamente sui sistemi aziendali.

## 3 · Agenti e Piattaforme Orchestratrici
*(~48s)*

Per capire come questo sia possibile, bisogna partire da due concetti chiave.
 **Un AI Agent** è un assistente conversazionale autonomo che comprende la richiesta dell'utente in linguaggio naturale, recupera contesto dai sistemi del cliente tramite tool e API, esegue azioni e genera una risposta, su qualsiasi canale. 
 **Le piattaforme orchestratrici**, come indigo.ai, permettono di costruire questi agenti da un'unica interfaccia, farli dialogare tra loro, gestire la knowledge base su cui si basano, integrarli con i sistemi informativi esistenti e definire guardrail per un comportamento sicuro. Il concetto centrale è proprio questo: *un'intelligenza artificiale in grado di colloquiare con i sistemi informativi*.

## 4 · Context Engineering
*(~42s)*

Ciò che ha reso possibile questo salto è il "context engineering", che ha cambiato radicalmente la capacità dell'AI di comunicare con i sistemi informatici. 
Il prompt che l'agente esegue nasce dall'integrazione di tre componenti: 
- il **prompt** engineering, cioè le istruzioni; 
- la **RAG**, la conoscenza statica recuperata dalla knowledge base; 
-  il **context engineering**, i dati live recuperati dai sistemi tramite MCP e tool. L'agente esegue questo prompt integrato e genera di conseguenza una risposta, oppure un'azione diretta sui sistemi aziendali.

## 5 · MCP, Tools & Swagger
*(~50s)*

Per collegare l'agente ai sistemi ho lavorato soprattutto con due meccanismi.
 Il primo è **l'MCP**, un protocollo standard che permette di connettere l'AI ai sistemi del cliente con un'unica integrazione invece di tante integrazioni custom: dati sempre aggiornati, chiamata autonoma dei tool, riuso tra più agenti e scope controllato.
  Il secondo si usa quando un sistema non ha un server MCP nativo: si genera la **specifica OpenAPI**, o Swagger, dalle API REST esistenti e la si carica in piattaforma, che la trasforma in un tool richiamabile. In entrambi i casi il vantaggio è lo stesso: *l'agente accede e agisce sui sistemi reali, gestendo da solo le chiamate API*.

## 6 · Gli strumenti dietro i progetti
*(~40s)*

Dietro questi progetti c'è uno stack di strumenti concreto. indigo.ai per l'orchestrazione conversazionale, il RAG e le architetture multi-agente. ElevenLabs per la sintesi vocale del voicebot Lucilla. Agent Builder di OpenAI per la prototipazione rapida di nuovi agenti. Replit per sviluppo e hosting veloce dei prototipi. Postman per testare e validare API ed endpoint Swagger. E Reducto per il parsing dei documenti, ad esempio per convertire fogli Excel in Markdown e JSON per la knowledge base del progetto Lenovo.

## 7 · Tre casi, tre scopi diversi
*(~48s)*

Ho affrontato tre casi con tre scopi molto diversi tra loro. Per Eni, 
- il progetto Plenitude Lucilla, con indigo.ai ed ElevenLabs: un voicebot vocale che guida il cliente finale nell'invio dell'autolettura del contatore in tempo reale. 
- Per Lenovo, con indigo.ai: un agente che recupera il catalogo prodotti e assiste il venditore della rete retail nella scelta del modello giusto, via chat. 
- Per Younited, con Google AI Studio: un agente che automatizza il processo interno di produzione di nuovi contenuti SEO, sempre via chat. Tre canali, tre utenti finali, un'unica logica agentica di fondo.

## 8 · Divider — Considerazioni
*(~15s)*

Da qui vorrei passare alle considerazioni più ampie che questo lavoro mi ha permesso di sviluppare, che vanno oltre i singoli progetti tecnici.

## 9 · Automation rate al 70-80%
*(~58s)*

Sul piano dei risultati, nei progetti di Customer Experience si raggiunge tipicamente un automation rate del 70-80%: significa che 7-8 richieste su 10 vengono gestite dall'agente dall'inizio alla fine, senza intervento umano. Per l'azienda questo si traduce in un impatto concreto: 
- riduzione dei costi operativi del servizio clienti
-  possibilità di scalare i volumi senza scalare proporzionalmente il personale
-  operatori umani liberati dalle richieste ripetitive per concentrarsi sui casi complessi ad alto valore. 

*Quando l'agente è progettato bene, l'AI agentica produce quindi un impatto reale e misurabile sui KPI di business* dell'azienda, non solo un miglioramento percepito dall'utente.

## 10 · Il punto di partenza del dibattito — 95%
*(~65s)*

Questo risultato però va contestualizzato, secondo uno studio del 2025 del MIT, della NANDA Initiative, il 95% dei progetti pilota di GenAI non abbia prodotto alcun ritorno economico o profitto misurabile? La risposta, è che quasi mai il problema è il modello di intelligenza artificiale in sé: **è quasi sempre un problema di contesto, tecnico e organizzativo**, quello che viene fornito all'agente. Sul piano tecnico, significa sistemi legacy senza API esposte, knowledge base incomplete o disallineate, dati chiusi in silos che l'agente non riesce a raggiungere in tempo reale. Sul piano organizzativo, significa processi aziendali non definiti con chiarezza, o governance che blocca l'accesso ai sistemi prima ancora di iniziare. *Lo stesso modello, con contesto diverso, produce risultati radicalmente diversi.*

## 11 · Forward Engineering
*(~48s)*

Da questa considerazione nasce un punto progettuale importante. In ambiente enterprise, governance e security restano vincoli fissi e non negoziabili, qualunque sia la tecnologia adottata. Allo stesso tempo, i progetti di AI hanno una mutevolezza molto rapida: la tecnologia cambia radicalmente nel giro di un anno. Per questo credo si debba adottare un modello di forward engineering: si fissano gli obiettivi del processo, non passaggi rigidi, lasciando il progetto libero di evolvere. Basta pensare al prima e al dopo MCP: *in meno di un anno il modo stesso di integrare l'AI con i sistemi è già cambiato radicalmente*.

## 12 · L'adozione è un ostacolo
*(~50s)*

Sul piano organizzativo, l'adozione stessa è spesso l'ostacolo principale. Non basta che la tecnologia funzioni: attorno a un progetto del genere ci sono tante persone diverse in azienda, e devono essere tutte d'accordo prima di partire. Chi gestisce i sistemi informatici vuole essere sicuro che tutto resti sotto controllo. Chi decide gli investimenti vuole vedere un ritorno economico in tempi brevi. Chi si occupa delle persone si chiede che effetto avrà sui ruoli e sul lavoro dei dipendenti. Chi si occupa di normative e sicurezza vuole garanzie prima di dare il via libera. Mettere d'accordo tutte queste parti richiede tempo, ed è spesso più lento e complicato dello sviluppo tecnico stesso. *La barriera non è il costo o la complessità della tecnologia, ma la difficoltà delle organizzazioni di prendere decisioni percepite come destabilizzanti.*

## 13 · Conclusioni — tecnologia pronta, adozione enterprise no
*(~45s)*

Arrivo quindi alla conclusione: la tecnologia è pronta, l'adozione enterprise non ancora. 
- Sul piano tecnologico, siamo già pronti per il primo livello di Customer Experience: un agente può dialogare, guidare e assistere il cliente finale in autonomia, come dimostra il progetto Lucilla. 
- Sul piano dell'adozione enterprise, invece, la maturità non c'è ancora, per tre motivi legati tra loro: la tecnologia cambia più in fretta di quanto un'azienda riesca a decidere e organizzarsi; le regole di sicurezza e controllo dei sistemi non si possono aggirare, qualunque sia la tecnologia adottata; e le persone coinvolte in azienda faticano a prendere decisioni che percepiscono come rischiose per il proprio ruolo o per l'organizzazione. *Il limite, oggi, non è più cosa la tecnologia sa fare, ma quanto velocemente l'impresa riesce ad adottarla.*

## 14 · Chiusura
*(~10s)*

Vi ringrazio per l'attenzione.

---

**Totale stimato:** ~9-10 minuti a ritmo naturale.
