import React, { useState } from 'react';
import { QuizQuestion, MemoryCardPair } from '../types';
import { X, Plus, Download, Upload, Image, Check, AlertCircle } from 'lucide-react';

interface ContentManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddQuestion: (q: QuizQuestion) => void;
  onAddMemoryPair: (pair: MemoryCardPair) => void;
  onExportJson: () => void;
  onImportJson: (json: string) => boolean;
  companyLogoUrl: string;
  onUpdateLogoUrl: (url: string) => void;
  totalQuestions: number;
  totalMemoryPairs: number;
}

export const ContentManagerModal: React.FC<ContentManagerModalProps> = ({
  isOpen,
  onClose,
  onAddQuestion,
  onAddMemoryPair,
  onExportJson,
  onImportJson,
  companyLogoUrl,
  onUpdateLogoUrl,
  totalQuestions,
  totalMemoryPairs
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'branding' | 'question' | 'memory' | 'backup'>('branding');
  
  // Branding state
  const [logoInput, setLogoInput] = useState(companyLogoUrl || '');

  // Question state
  const [qText, setQText] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctIdx, setCorrectIdx] = useState(0);
  const [qExplanation, setQExplanation] = useState('');
  const [qCategory, setQCategory] = useState('Operações CCA');
  const [questionSuccess, setQuestionSuccess] = useState(false);

  // Memory pair state
  const [memTerm, setMemTerm] = useState('');
  const [memDesc, setMemDesc] = useState('');
  const [memCategory, setMemCategory] = useState<'Tecnologia' | 'Regras & CTB' | 'Operações'>('Operações');
  const [memorySuccess, setMemorySuccess] = useState(false);

  // Import state
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSaveLogo = () => {
    onUpdateLogoUrl(logoInput);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setLogoInput(base64);
        onUpdateLogoUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !opt0.trim() || !opt1.trim()) return;

    const newQuestion: QuizQuestion = {
      id: `custom-q-${Date.now()}`,
      question: qText.trim(),
      options: [opt0.trim(), opt1.trim(), opt2.trim() || 'N/A', opt3.trim() || 'N/A'],
      correctIndex: correctIdx,
      explanation: qExplanation.trim() || 'Resposta conforme procedimento operacional padrão do CCA.',
      category: qCategory,
      difficulty: 'Médio'
    };

    onAddQuestion(newQuestion);
    setQuestionSuccess(true);
    setQText('');
    setOpt0('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setQExplanation('');
    setTimeout(() => setQuestionSuccess(false), 3000);
  };

  const handleSaveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memTerm.trim() || !memDesc.trim()) return;

    const newPair: MemoryCardPair = {
      id: `custom-mem-${Date.now()}`,
      term: memTerm.trim(),
      description: memDesc.trim(),
      category: memCategory
    };

    onAddMemoryPair(newPair);
    setMemorySuccess(true);
    setMemTerm('');
    setMemDesc('');
    setTimeout(() => setMemorySuccess(false), 3000);
  };

  const handleExecuteImport = () => {
    if (!importJsonText.trim()) return;
    const ok = onImportJson(importJsonText.trim());
    if (ok) {
      setImportStatus('Dados importados com sucesso!');
      setImportJsonText('');
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('Erro: Formato JSON inválido.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block">
              Gestor de Conteúdos & Expansão
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Personalização & Banco de Questões
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl my-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('branding')}
            className={`flex-1 py-1.5 px-3 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'branding' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Logo da Empresa
          </button>
          <button
            onClick={() => setActiveTab('question')}
            className={`flex-1 py-1.5 px-3 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'question' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            + Pergunta ({totalQuestions})
          </button>
          <button
            onClick={() => setActiveTab('memory')}
            className={`flex-1 py-1.5 px-3 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'memory' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            + Par da Memória ({totalMemoryPairs})
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`flex-1 py-1.5 px-3 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'backup' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Backup JSON
          </button>
        </div>

        {/* Tab 1: Branding / Logo */}
        {activeTab === 'branding' && (
          <div className="space-y-4 py-2">
            <p className="text-xs text-slate-600 leading-relaxed">
              Você pode colar a URL da logo oficial da <strong>Caminhos da Celulose</strong> ou fazer o upload de uma imagem do seu computador. Ela ficará salva localmente e aparecerá no cabeçalho e no certificado!
            </p>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                URL da Imagem da Logo:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://exemplo.com.br/logo-caminhos-da-celulose.png"
                  value={logoInput}
                  onChange={(e) => setLogoInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-800"
                />
                <button
                  onClick={handleSaveLogo}
                  className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900 cursor-pointer"
                >
                  Salvar URL
                </button>
              </div>
            </div>

            <div className="pt-2">
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Ou faça Upload do arquivo de imagem (PNG/JPG):
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
              />
            </div>

            {logoInput && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between mt-3">
                <span className="text-xs text-slate-500 font-mono">Pré-visualização:</span>
                <img
                  src={logoInput}
                  alt="Prévia Logo"
                  className="h-10 w-auto max-w-[180px] object-contain rounded"
                  onError={() => alert('Não foi possível carregar a imagem desta URL.')}
                />
              </div>
            )}
          </div>
        )}

        {/* Tab 2: New Question */}
        {activeTab === 'question' && (
          <form onSubmit={handleSaveQuestion} className="space-y-3 py-2">
            {questionSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Nova questão adicionada com sucesso ao banco de provas!</span>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Enunciado da Questão:
              </label>
              <textarea
                rows={2}
                required
                placeholder="Ex: Como o operador deve proceder caso o veículo de carga apresente reboque desengatado?"
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Opção A:</label>
                <input
                  type="text"
                  required
                  value={opt0}
                  onChange={(e) => setOpt0(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Opção B:</label>
                <input
                  type="text"
                  required
                  value={opt1}
                  onChange={(e) => setOpt1(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Opção C:</label>
                <input
                  type="text"
                  value={opt2}
                  onChange={(e) => setOpt2(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Opção D:</label>
                <input
                  type="text"
                  value={opt3}
                  onChange={(e) => setOpt3(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Resposta Correta:</label>
                <select
                  value={correctIdx}
                  onChange={(e) => setCorrectIdx(Number(e.target.value))}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                >
                  <option value={0}>Opção A</option>
                  <option value={1}>Opção B</option>
                  <option value={2}>Opção C</option>
                  <option value={3}>Opção D</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Categoria:</label>
                <select
                  value={qCategory}
                  onChange={(e) => setQCategory(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Operações CCA">Operações CCA</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Regulatório">Regulatório</option>
                  <option value="Procedimentos">Procedimentos</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Explicação / Justificativa do Gabarito:
              </label>
              <input
                type="text"
                placeholder="Ex: Conforme a diretriz do POP nº 12, orienta-se..."
                value={qExplanation}
                onChange={(e) => setQExplanation(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-semibold text-xs hover:bg-emerald-900 transition-colors cursor-pointer mt-2"
            >
              Adicionar Questão ao Quiz
            </button>
          </form>
        )}

        {/* Tab 3: New Memory Pair */}
        {activeTab === 'memory' && (
          <form onSubmit={handleSaveMemory} className="space-y-3 py-2">
            {memorySuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Novo par adicionado ao Jogo da Memória!</span>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Termo / Sigla (Card 1):
              </label>
              <input
                type="text"
                required
                placeholder="Ex: OCR Traseiro"
                value={memTerm}
                onChange={(e) => setMemTerm(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Definição / Significado (Card 2):
              </label>
              <textarea
                rows={2}
                required
                placeholder="Ex: Leitura da placa traseira para validação de passagens onde a dianteira estava suja."
                value={memDesc}
                onChange={(e) => setMemDesc(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Categoria:</label>
              <select
                value={memCategory}
                onChange={(e) => setMemCategory(e.target.value as any)}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option value="Operações">Operações</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Regras & CTB">Regras & CTB</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-800 text-white font-semibold text-xs hover:bg-amber-900 transition-colors cursor-pointer mt-2"
            >
              Adicionar Par ao Jogo
            </button>
          </form>
        )}

        {/* Tab 4: Backup Export / Import */}
        {activeTab === 'backup' && (
          <div className="space-y-4 py-2 text-xs text-slate-600">
            <p>
              Como o site roda 100% no navegador (GitHub Pages), você pode exportar todo o banco de questões, progresso e módulos para um arquivo JSON e compartilhar com sua equipe.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Exportar Banco Completo</span>
                <span className="text-[11px] text-slate-500">Baixar arquivo JSON com todas as questões e módulos</span>
              </div>
              <button
                onClick={onExportJson}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-800 text-white rounded-lg font-semibold hover:bg-emerald-900 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar JSON</span>
              </button>
            </div>

            <div className="space-y-2 pt-2">
              <span className="font-bold text-slate-900 block">Importar de Arquivo JSON:</span>
              <textarea
                rows={3}
                placeholder="Cole o código JSON do backup aqui para restaurar..."
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-[11px]"
              />
              <button
                onClick={handleExecuteImport}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 cursor-pointer"
              >
                Restaurar Dados
              </button>
              {importStatus && (
                <span className="block font-medium text-emerald-800 mt-1">{importStatus}</span>
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
