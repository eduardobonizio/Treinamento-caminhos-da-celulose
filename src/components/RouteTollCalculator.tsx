import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Calculator, 
  MapPin, 
  Navigation, 
  ArrowRight, 
  ArrowLeftRight, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Truck, 
  Car, 
  Info,
  Building2,
  ChevronDown,
  Clock,
  Compass,
  Loader2,
  Map as MapIcon,
  Layers,
  ExternalLink,
  Copy,
  Check,
  Percent,
  Repeat,
  ShieldCheck,
  Search,
  Factory,
  Landmark,
  Plus,
  Trash2,
  Globe
} from 'lucide-react';

export interface CityNode {
  id: string;
  name: string;
  uf: string;
  region: string;
  locationType: 'municipality' | 'district' | 'reference' | 'external';
  lat: number;
  lng: number;
}

export interface GantryDef {
  id: string;
  code: string;
  number: number;
  highway: string;
  kmDisplay: string;
  declaredKm: number;
  estimatedKm: number;
  axisDistanceM: number;
  city: string;
  lat: number;
  lng: number;
  baseFee: number; // Base fee for 1x car
}

export interface RouteEdge {
  from: string;
  to: string;
  highway: string;
  gantries: string[]; // Gantry IDs in forward direction from -> to
}

export interface OfficialVehicleCategory {
  id: string;
  code: string;
  name: string;
  wheelsType: string;
  axesDescription: string;
  baseMultiplier: number;
  exampleVehicles: string;
  isCustomAxisCount?: boolean;
}

export interface ExemptionType {
  id: string;
  label: string;
  detail: string;
}

// 1. Expanded Official Locations Array (65 MS Locations)
export const CITIES: CityNode[] = [
  // --- Original Base Concession Cities ---
  { id: 'cg', name: 'Campo Grande', uf: 'MS', region: 'Capital', locationType: 'municipality', lat: -20.4697, lng: -54.6201 },
  { id: 'rrp', name: 'Ribas do Rio Pardo', uf: 'MS', region: 'Polo Florestal BR-262', locationType: 'municipality', lat: -20.4431, lng: -53.7592 },
  { id: 'ac', name: 'Água Clara', uf: 'MS', region: 'Costa Leste BR-262', locationType: 'municipality', lat: -20.4481, lng: -52.8797 },
  { id: 'tl', name: 'Três Lagoas', uf: 'MS', region: 'Polo Industrial Leste BR-262', locationType: 'municipality', lat: -20.7849, lng: -51.7007 },
  { id: 'srp', name: 'Santa Rita do Pardo', uf: 'MS', region: 'Corredor MS-040', locationType: 'municipality', lat: -21.3014, lng: -52.8306 },
  { id: 'bat', name: 'Bataguassu', uf: 'MS', region: 'Entroncamento BR-267 / Divisa SP', locationType: 'municipality', lat: -21.7142, lng: -52.4222 },
  { id: 'nand', name: 'Nova Andradina', uf: 'MS', region: 'Vale do Ivinhema BR-267', locationType: 'municipality', lat: -22.2333, lng: -53.3431 },
  { id: 'nas', name: 'Nova Alvorada do Sul', uf: 'MS', region: 'Entroncamento BR-163 / BR-267', locationType: 'municipality', lat: -21.4658, lng: -54.3839 },
  { id: 'anau', name: 'Anaurilândia', uf: 'MS', region: 'Região Leste BR-267', locationType: 'municipality', lat: -22.1875, lng: -52.7178 },
  { id: 'cam', name: 'Camapuã', uf: 'MS', region: 'Norte MS-338', locationType: 'municipality', lat: -19.5314, lng: -54.0439 },
  { id: 'bra', name: 'Brasilândia', uf: 'MS', region: 'Corredor MS-395', locationType: 'municipality', lat: -21.2561, lng: -52.0369 },
  { id: 'dou', name: 'Dourados', uf: 'MS', region: 'Região Sul BR-163', locationType: 'municipality', lat: -22.2231, lng: -54.8120 },
  { id: 'sid', name: 'Sidrolândia', uf: 'MS', region: 'Região Central BR-060', locationType: 'municipality', lat: -20.9319, lng: -54.9614 },
  { id: 'ter', name: 'Terenos', uf: 'MS', region: 'Região Central BR-262', locationType: 'municipality', lat: -20.4422, lng: -54.8603 },

  // --- Additional MS Municipalities (30) ---
  { id: 'chs', name: 'Chapadão do Sul', uf: 'MS', region: 'Norte Agro', locationType: 'municipality', lat: -18.7903, lng: -52.6228 },
  { id: 'cas', name: 'Cassilândia', uf: 'MS', region: 'Divisa GO/MS', locationType: 'municipality', lat: -19.1133, lng: -51.7342 },
  { id: 'ino', name: 'Inocência', uf: 'MS', region: 'Polo Celulose Arauco', locationType: 'municipality', lat: -19.7258, lng: -51.9283 },
  { id: 'sel', name: 'Selvíria', uf: 'MS', region: 'Costa Leste', locationType: 'municipality', lat: -20.3672, lng: -51.4189 },
  { id: 'pda', name: 'Paraíso das Águas', uf: 'MS', region: 'Norte BR-060', locationType: 'municipality', lat: -19.0256, lng: -53.0114 },
  { id: 'cri', name: 'Costa Rica', uf: 'MS', region: 'Norte MS-306', locationType: 'municipality', lat: -18.5439, lng: -53.1464 },
  { id: 'ban', name: 'Bandeirantes', uf: 'MS', region: 'Norte BR-163', locationType: 'municipality', lat: -19.9175, lng: -54.3611 },
  { id: 'sgo', name: 'São Gabriel do Oeste', uf: 'MS', region: 'Polo Agro BR-163', locationType: 'municipality', lat: -19.3953, lng: -54.5656 },
  { id: 'cox', name: 'Coxim', uf: 'MS', region: 'Norte BR-163', locationType: 'municipality', lat: -18.5067, lng: -54.7600 },
  { id: 'rvm', name: 'Rio Verde de Mato Grosso', uf: 'MS', region: 'Norte BR-163', locationType: 'municipality', lat: -18.9181, lng: -54.8442 },
  { id: 'jar', name: 'Jaraguari', uf: 'MS', region: 'Entorno da Capital BR-163', locationType: 'municipality', lat: -20.1417, lng: -54.3994 },
  { id: 'roc', name: 'Rochedo', uf: 'MS', region: 'Região MS-080', locationType: 'municipality', lat: -19.9531, lng: -54.8925 },
  { id: 'cor', name: 'Corguinho', uf: 'MS', region: 'Região MS-080', locationType: 'municipality', lat: -19.8317, lng: -54.8294 },
  { id: 'dib', name: 'Dois Irmãos do Buriti', uf: 'MS', region: 'Acesso Pantanal BR-262', locationType: 'municipality', lat: -20.6797, lng: -55.2961 },
  { id: 'ana', name: 'Anastácio', uf: 'MS', region: 'Portal do Pantanal BR-262', locationType: 'municipality', lat: -20.4836, lng: -55.8069 },
  { id: 'aqu', name: 'Aquidauana', uf: 'MS', region: 'Portal do Pantanal BR-262', locationType: 'municipality', lat: -20.4711, lng: -55.7872 },
  { id: 'mir', name: 'Miranda', uf: 'MS', region: 'Pantanal BR-262', locationType: 'municipality', lat: -20.2406, lng: -56.3783 },
  { id: 'mar', name: 'Maracaju', uf: 'MS', region: 'Polo Agro Sul', locationType: 'municipality', lat: -21.6144, lng: -55.1683 },
  { id: 'rbr', name: 'Rio Brilhante', uf: 'MS', region: 'Corredor BR-163', locationType: 'municipality', lat: -21.8019, lng: -54.5464 },
  { id: 'caa', name: 'Caarapó', uf: 'MS', region: 'Região Sul BR-163', locationType: 'municipality', lat: -22.6342, lng: -54.8219 },
  { id: 'nav', name: 'Naviraí', uf: 'MS', region: 'Cone Sul BR-163', locationType: 'municipality', lat: -23.0650, lng: -54.1906 },
  { id: 'ivi', name: 'Ivinhema', uf: 'MS', region: 'Vale do Ivinhema', locationType: 'municipality', lat: -22.3047, lng: -53.8153 },
  { id: 'ang', name: 'Angélica', uf: 'MS', region: 'Vale do Ivinhema', locationType: 'municipality', lat: -22.1525, lng: -53.7719 },
  { id: 'deo', name: 'Deodápolis', uf: 'MS', region: 'Região Sul', locationType: 'municipality', lat: -22.2758, lng: -54.1650 },
  { id: 'gld', name: 'Glória de Dourados', uf: 'MS', region: 'Região Sul', locationType: 'municipality', lat: -22.4172, lng: -54.2328 },
  { id: 'fds', name: 'Fátima do Sul', uf: 'MS', region: 'Região Sul', locationType: 'municipality', lat: -22.3744, lng: -54.5144 },
  { id: 'bay', name: 'Batayporã', uf: 'MS', region: 'Vale do Ivinhema MS-134', locationType: 'municipality', lat: -22.2953, lng: -53.2711 },
  { id: 'taq', name: 'Taquarussu', uf: 'MS', region: 'Vale do Ivinhema', locationType: 'municipality', lat: -22.4878, lng: -53.3514 },
  { id: 'apt', name: 'Aparecida do Taboado', uf: 'MS', region: 'Divisa SP/MS BR-158', locationType: 'municipality', lat: -20.0867, lng: -51.0936 },
  { id: 'par', name: 'Paranaíba', uf: 'MS', region: 'Divisa MG/MS BR-158', locationType: 'municipality', lat: -19.6772, lng: -51.1908 },

  // --- Distritos, Vilas e Regiões Rurais (11) ---
  { id: 'dist-anh', name: 'Distrito de Anhanduí', uf: 'MS', region: 'Campo Grande · BR-163', locationType: 'district', lat: -20.9850, lng: -54.5060 },
  { id: 'dist-ind', name: 'Distrito de Indubrasil', uf: 'MS', region: 'Campo Grande · BR-262', locationType: 'district', lat: -20.4850, lng: -54.7450 },
  { id: 'dist-roch', name: 'Distrito de Rochedinho', uf: 'MS', region: 'Campo Grande · MS-080', locationType: 'district', lat: -20.2680, lng: -54.7250 },
  { id: 'dist-ara', name: 'Distrito de Arapuá', uf: 'MS', region: 'Três Lagoas · BR-262', locationType: 'district', lat: -20.6720, lng: -52.1260 },
  { id: 'dist-gar', name: 'Distrito de Garcias', uf: 'MS', region: 'Três Lagoas · BR-262', locationType: 'district', lat: -20.4150, lng: -52.2780 },
  { id: 'dist-ncv', name: 'Distrito de Nova Casa Verde', uf: 'MS', region: 'Nova Andradina · BR-267', locationType: 'district', lat: -21.6930, lng: -53.7290 },
  { id: 'dist-que', name: 'Distrito de Quebracho', uf: 'MS', region: 'Anaurilândia · MS-276', locationType: 'district', lat: -22.0250, lng: -52.7300 },
  { id: 'dist-deb', name: 'Distrito de Debrasa', uf: 'MS', region: 'Brasilândia · MS-395', locationType: 'district', lat: -21.3320, lng: -52.1850 },
  { id: 'dist-bal', name: 'Distrito de Bálsamo', uf: 'MS', region: 'Ribas do Rio Pardo · BR-262', locationType: 'district', lat: -20.4520, lng: -54.0100 },
  { id: 'dist-ptc', name: 'Distrito de Pontinha do Cocho', uf: 'MS', region: 'Camapuã · MS-338', locationType: 'district', lat: -19.2580, lng: -53.7920 },
  { id: 'dist-mut', name: 'Assentamento Mutum', uf: 'MS', region: 'Ribas/Santa Rita · MS-040', locationType: 'district', lat: -21.0500, lng: -53.5000 },

  // --- Polos Industriais, Fazendas e Pontos de Referência nas Rodovias (10) ---
  { id: 'ref-polo-cg', name: 'Polo Industrial / Saída Três Lagoas', uf: 'MS', region: 'Campo Grande · BR-262', locationType: 'reference', lat: -20.4880, lng: -54.5120 },
  { id: 'ref-rumo', name: 'Terminal Intermodal Rumo', uf: 'MS', region: 'Indubrasil · BR-262', locationType: 'reference', lat: -20.4910, lng: -54.7520 },
  { id: 'ref-suzano-rrp', name: 'Complexo Industrial Suzano (Ribas)', uf: 'MS', region: 'Ribas do Rio Pardo · BR-262', locationType: 'reference', lat: -20.5120, lng: -53.6850 },
  { id: 'ref-suzano-tl', name: 'Complexo Suzano / Eldorado (Três Lagoas)', uf: 'MS', region: 'Três Lagoas · BR-262', locationType: 'reference', lat: -20.8950, lng: -51.6520 },
  { id: 'ref-arauco', name: 'Polo Celulose Arauco', uf: 'MS', region: 'Inocência · MS-240', locationType: 'reference', lat: -19.8100, lng: -51.8800 },
  { id: 'ref-posto-mutum', name: 'Posto Mutum (BR-262)', uf: 'MS', region: 'Ribas / Água Clara · BR-262', locationType: 'reference', lat: -20.4820, lng: -53.1500 },
  { id: 'ref-trevao', name: 'Posto Trevão (BR-163 / BR-267)', uf: 'MS', region: 'Nova Alvorada do Sul', locationType: 'reference', lat: -21.4720, lng: -54.3780 },
  { id: 'ref-ponte', name: 'Ponte Hélio Serejo / Divisa SP', uf: 'MS', region: 'Bataguassu · BR-267', locationType: 'reference', lat: -21.7480, lng: -52.2650 },
  { id: 'ref-sergio-motta', name: 'Usina Sérgio Motta / Porto Primavera', uf: 'MS', region: 'Brasilândia/Bataguassu · MS-395', locationType: 'reference', lat: -22.4750, lng: -52.9580 },
  { id: 'ref-fazenda-040', name: 'Polo Agroflorestal Fazenda MS-040', uf: 'MS', region: 'Santa Rita do Pardo · MS-040', locationType: 'reference', lat: -20.9200, lng: -53.9500 },
];

// 2. Official 14 Gantries
export const GANATRIES_MAP: Record<string, GantryDef> = {
  'p01': { id: 'p01', code: 'Pórtico-01', number: 1, highway: 'BR-262', kmDisplay: 'km 040+450', declaredKm: 40.450, estimatedKm: 40.277, axisDistanceM: 1.7, city: 'Três Lagoas/MS', lat: -20.774761, lng: -51.972631, baseFee: 13.70 },
  'p02': { id: 'p02', code: 'Pórtico-02', number: 2, highway: 'BR-262', kmDisplay: 'km 109+500', declaredKm: 109.500, estimatedKm: 109.585, axisDistanceM: 0.8, city: 'Água Clara/MS', lat: -20.532817, lng: -52.578264, baseFee: 16.00 },
  'p03': { id: 'p03', code: 'Pórtico-03', number: 3, highway: 'BR-262', kmDisplay: 'km 204+460', declaredKm: 204.460, estimatedKm: 204.437, axisDistanceM: 6.5, city: 'Ribas do Rio Pardo/MS', lat: -20.467206, lng: -53.427997, baseFee: 18.00 },
  'p04': { id: 'p04', code: 'Pórtico-04', number: 4, highway: 'BR-262', kmDisplay: 'km 288+300', declaredKm: 288.300, estimatedKm: 288.392, axisDistanceM: 7.9, city: 'Campo Grande/MS', lat: -20.490294, lng: -54.188414, baseFee: 14.90 },
  'p05': { id: 'p05', code: 'Pórtico-05', number: 5, highway: 'MS-040', kmDisplay: 'km 045+360', declaredKm: 45.360, estimatedKm: 45.422, axisDistanceM: 1.6, city: 'Campo Grande/MS', lat: -20.712436, lng: -54.231033, baseFee: 14.90 },
  'p06': { id: 'p06', code: 'Pórtico-06', number: 6, highway: 'MS-040', kmDisplay: 'km 216+120', declaredKm: 216.120, estimatedKm: 216.049, axisDistanceM: 2.9, city: 'Santa Rita do Pardo/MS', lat: -21.262358, lng: -52.906136, baseFee: 5.60 },
  'p07': { id: 'p07', code: 'Pórtico-07', number: 7, highway: 'MS-338', kmDisplay: 'km 311+900', declaredKm: 311.900, estimatedKm: 313.988, axisDistanceM: 4.8, city: 'Santa Rita do Pardo/MS', lat: -21.464914, lng: -52.633011, baseFee: 5.60 },
  'p08': { id: 'p08', code: 'Pórtico-08', number: 8, highway: 'BR-267', kmDisplay: 'km 024+500', declaredKm: 24.500, estimatedKm: 23.918, axisDistanceM: 7.1, city: 'Bataguassu/MS', lat: -21.726575, lng: -52.369401, baseFee: 10.90 },
  'p09': { id: 'p09', code: 'Pórtico-09', number: 9, highway: 'BR-267', kmDisplay: 'km 129+100', declaredKm: 129.100, estimatedKm: 129.348, axisDistanceM: 9.0, city: 'Nova Andradina/MS', lat: -21.731950, lng: -53.306156, baseFee: 17.80 },
  'p10': { id: 'p10', code: 'Pórtico-10', number: 10, highway: 'BR-267', kmDisplay: 'km 182+000', declaredKm: 182.000, estimatedKm: 182.120, axisDistanceM: 3.9, city: 'Nova Alvorada do Sul/MS', lat: -21.606100, lng: -53.789867, baseFee: 13.10 },
  'p11': { id: 'p11', code: 'Pórtico-11', number: 11, highway: 'MS-040', kmDisplay: 'km 123+860', declaredKm: 123.860, estimatedKm: 123.536, axisDistanceM: 3.5, city: 'Ribas do Rio Pardo/MS', lat: -21.099819, lng: -53.702325, baseFee: 16.20 },
  'p12': { id: 'p12', code: 'Pórtico-12', number: 12, highway: 'BR-267', kmDisplay: 'km 065+750', declaredKm: 65.750, estimatedKm: 66.198, axisDistanceM: 3.9, city: 'Anaurilândia/MS', lat: -21.852417, lng: -52.733739, baseFee: 12.30 },
  'p13': { id: 'p13', code: 'Pórtico-13', number: 13, highway: 'MS-338', kmDisplay: 'km 150+000', declaredKm: 150.000, estimatedKm: 150.000, axisDistanceM: 2.5, city: 'Camapuã/MS', lat: -19.980000, lng: -53.900000, baseFee: 16.20 },
  'p14': { id: 'p14', code: 'Pórtico-14', number: 14, highway: 'MS-395', kmDisplay: 'km 080+000', declaredKm: 80.000, estimatedKm: 80.000, axisDistanceM: 2.0, city: 'Brasilândia/MS', lat: -21.480000, lng: -52.230000, baseFee: 11.30 },
};

// 3. Topo-Geographic Segments / Graph Edges
export const ROUTE_EDGES: RouteEdge[] = [
  // BR-262 Corridor
  { from: 'cg', to: 'rrp', highway: 'BR-262', gantries: ['p04'] },
  { from: 'rrp', to: 'ac', highway: 'BR-262', gantries: ['p03'] },
  { from: 'ac', to: 'tl', highway: 'BR-262', gantries: ['p02', 'p01'] },

  // MS-040 Corridor
  { from: 'cg', to: 'srp', highway: 'MS-040', gantries: ['p05', 'p11', 'p06'] },

  // MS-338 Corridor
  { from: 'srp', to: 'bat', highway: 'MS-338', gantries: ['p07'] },
  { from: 'cam', to: 'rrp', highway: 'MS-338', gantries: ['p13'] },

  // BR-163 / BR-267 Corridor
  { from: 'cg', to: 'nas', highway: 'BR-163', gantries: [] },
  { from: 'nas', to: 'nand', highway: 'BR-267', gantries: ['p10'] },
  { from: 'nand', to: 'anau', highway: 'BR-267', gantries: ['p09'] },
  { from: 'anau', to: 'bat', highway: 'BR-267', gantries: ['p12', 'p08'] },

  // MS-395 Corridor
  { from: 'bat', to: 'bra', highway: 'MS-395', gantries: ['p14'] },
  { from: 'bra', to: 'tl', highway: 'MS-395', gantries: [] },

  // Regional Accesses
  { from: 'ter', to: 'cg', highway: 'BR-262', gantries: [] },
  { from: 'sid', to: 'cg', highway: 'BR-060', gantries: [] },
  { from: 'dou', to: 'nas', highway: 'BR-163', gantries: [] },

  // Additional Municipal Connections
  { from: 'chs', to: 'pda', highway: 'BR-060', gantries: [] },
  { from: 'pda', to: 'cam', highway: 'BR-060', gantries: [] },
  { from: 'cas', to: 'par', highway: 'BR-158', gantries: [] },
  { from: 'ino', to: 'ac', highway: 'MS-240', gantries: [] },
  { from: 'ino', to: 'tl', highway: 'MS-377', gantries: [] },
  { from: 'sel', to: 'tl', highway: 'BR-158', gantries: [] },
  { from: 'cri', to: 'chs', highway: 'MS-306', gantries: [] },
  { from: 'ban', to: 'cg', highway: 'BR-163', gantries: [] },
  { from: 'sgo', to: 'ban', highway: 'BR-163', gantries: [] },
  { from: 'cox', to: 'rvm', highway: 'BR-163', gantries: [] },
  { from: 'rvm', to: 'sgo', highway: 'BR-163', gantries: [] },
  { from: 'jar', to: 'cg', highway: 'BR-163', gantries: [] },
  { from: 'roc', to: 'cg', highway: 'MS-080', gantries: [] },
  { from: 'cor', to: 'roc', highway: 'MS-080', gantries: [] },
  { from: 'dib', to: 'ter', highway: 'BR-262', gantries: [] },
  { from: 'ana', to: 'dib', highway: 'BR-262', gantries: [] },
  { from: 'aqu', to: 'ana', highway: 'BR-262', gantries: [] },
  { from: 'mir', to: 'aqu', highway: 'BR-262', gantries: [] },
  { from: 'mar', to: 'sid', highway: 'MS-162', gantries: [] },
  { from: 'rbr', to: 'nas', highway: 'BR-163', gantries: [] },
  { from: 'caa', to: 'dou', highway: 'BR-163', gantries: [] },
  { from: 'nav', to: 'caa', highway: 'BR-163', gantries: [] },
  { from: 'ivi', to: 'nand', highway: 'BR-376', gantries: [] },
  { from: 'ang', to: 'ivi', highway: 'MS-141', gantries: [] },
  { from: 'deo', to: 'ang', highway: 'MS-141', gantries: [] },
  { from: 'gld', to: 'deo', highway: 'MS-276', gantries: [] },
  { from: 'fds', to: 'dou', highway: 'BR-376', gantries: [] },
  { from: 'bay', to: 'nand', highway: 'MS-134', gantries: [] },
  { from: 'taq', to: 'bay', highway: 'MS-473', gantries: [] },
  { from: 'apt', to: 'par', highway: 'BR-158', gantries: [] },
  { from: 'par', to: 'sel', highway: 'BR-158', gantries: [] },

  // District & Rural Connections
  { from: 'dist-anh', to: 'cg', highway: 'BR-163', gantries: [] },
  { from: 'dist-ind', to: 'cg', highway: 'BR-262', gantries: [] },
  { from: 'dist-roch', to: 'cg', highway: 'MS-080', gantries: [] },
  { from: 'dist-ara', to: 'tl', highway: 'BR-262', gantries: [] },
  { from: 'dist-gar', to: 'tl', highway: 'BR-262', gantries: [] },
  { from: 'dist-ncv', to: 'nand', highway: 'BR-267', gantries: [] },
  { from: 'dist-que', to: 'anau', highway: 'MS-276', gantries: [] },
  { from: 'dist-deb', to: 'bra', highway: 'MS-395', gantries: [] },
  { from: 'dist-bal', to: 'rrp', highway: 'BR-262', gantries: [] },
  { from: 'dist-ptc', to: 'cam', highway: 'MS-338', gantries: [] },
  { from: 'dist-mut', to: 'srp', highway: 'MS-040', gantries: [] },

  // Reference Points & Industrial Complexes
  { from: 'ref-polo-cg', to: 'cg', highway: 'BR-262', gantries: [] },
  { from: 'ref-rumo', to: 'cg', highway: 'BR-262', gantries: [] },
  { from: 'ref-suzano-rrp', to: 'rrp', highway: 'BR-262', gantries: [] },
  { from: 'ref-suzano-tl', to: 'tl', highway: 'BR-262', gantries: [] },
  { from: 'ref-arauco', to: 'ino', highway: 'MS-240', gantries: [] },
  { from: 'ref-posto-mutum', to: 'rrp', highway: 'BR-262', gantries: [] },
  { from: 'ref-trevao', to: 'nas', highway: 'BR-267', gantries: [] },
  { from: 'ref-ponte', to: 'bat', highway: 'BR-267', gantries: [] },
  { from: 'ref-sergio-motta', to: 'bat', highway: 'MS-395', gantries: [] },
  { from: 'ref-fazenda-040', to: 'srp', highway: 'MS-040', gantries: [] },
];

// Phase 7 Official Concession Vehicle Categories
export const OFFICIAL_CATEGORIES: OfficialVehicleCategory[] = [
  {
    id: 'cat-1',
    code: 'CAT 1',
    name: 'CAT 1 – Veículo Leve',
    wheelsType: 'Rodagem simples',
    axesDescription: '2 eixos',
    baseMultiplier: 1.0,
    exampleVehicles: 'Automóveis, SUVs, Caminhonetes, Utililários'
  },
  {
    id: 'cat-2',
    code: 'CAT 2',
    name: 'CAT 2 – Veículo Comercial de 2 Eixos',
    wheelsType: 'Rodagem dupla',
    axesDescription: '2 eixos',
    baseMultiplier: 2.0,
    exampleVehicles: 'Caminhões leves, Ônibus 2 eixos'
  },
  {
    id: 'cat-3',
    code: 'CAT 3',
    name: 'CAT 3 – Veículo Leve com Reboque',
    wheelsType: 'Rodagem simples',
    axesDescription: '3 eixos',
    baseMultiplier: 1.5,
    exampleVehicles: 'Hilux + Carretinha, Carro + Reboque simples'
  },
  {
    id: 'cat-4',
    code: 'CAT 4',
    name: 'CAT 4 – Veículo Comercial de 3 Eixos',
    wheelsType: 'Rodagem dupla',
    axesDescription: '3 eixos',
    baseMultiplier: 3.0,
    exampleVehicles: 'Caminhão trucado, Ônibus 3 eixos'
  },
  {
    id: 'cat-5',
    code: 'CAT 5',
    name: 'CAT 5 – Veículo Leve com Reboque de 2 Eixos',
    wheelsType: 'Rodagem simples',
    axesDescription: '4 eixos',
    baseMultiplier: 2.0,
    exampleVehicles: 'SUV + Trailer, Carro + Reboque duplo'
  },
  {
    id: 'cat-6',
    code: 'CAT 6',
    name: 'CAT 6 – Veículo Comercial de 4 Eixos',
    wheelsType: 'Rodagem dupla',
    axesDescription: '4 eixos',
    baseMultiplier: 4.0,
    exampleVehicles: 'Caminhão rígido 4 eixos'
  },
  {
    id: 'cat-7',
    code: 'CAT 7',
    name: 'CAT 7 – Composição Comercial de 5 Eixos',
    wheelsType: 'Rodagem dupla',
    axesDescription: '5 eixos',
    baseMultiplier: 5.0,
    exampleVehicles: 'Carreta simples 5 eixos'
  },
  {
    id: 'cat-8',
    code: 'CAT 8',
    name: 'CAT 8 – Composição Comercial de 6 Eixos',
    wheelsType: 'Rodagem dupla',
    axesDescription: '6 eixos',
    baseMultiplier: 6.0,
    exampleVehicles: 'Carreta LS 6 eixos'
  },
  {
    id: 'cat-9',
    code: 'CAT 9',
    name: 'CAT 9 – Composição Comercial de 7 ou Mais Eixos',
    wheelsType: 'Rodagem dupla',
    axesDescription: '7 a 12 eixos',
    baseMultiplier: 7.0,
    exampleVehicles: 'Bitrem, Rodotrem, Tritrem florestal / graneleiro',
    isCustomAxisCount: true
  },
  {
    id: 'cat-isento',
    code: 'ISENTO',
    name: 'Veículos Isentos (Tarifa Zero)',
    wheelsType: 'Isenção Legal',
    axesDescription: '0 eixos cobrados',
    baseMultiplier: 0,
    exampleVehicles: 'Motocicletas, Motonetas, Ambulâncias, PRF, Bombeiros, Veículos Oficiais'
  }
];

// Legal Exemption Types
export const EXEMPTION_TYPES: ExemptionType[] = [
  { id: 'ex-moto', label: 'Motocicletas, Motonetas e Ciclomotores', detail: 'Isenção garantida pelo contrato de concessão Free Flow' },
  { id: 'ex-oficial', label: 'Veículos Oficiais (União, Estados e Municípios)', detail: 'Apenas em serviço oficial comprovado' },
  { id: 'ex-prf', label: 'Polícia Rodoviária Federal (PRF)', detail: 'Em serviço operacional na malha rodoviária' },
  { id: 'ex-pm', label: 'Polícia Militar Rodoviária', detail: 'Patrulhamento e operações em serviço' },
  { id: 'ex-amb', label: 'Ambulâncias e Resgate Medicalizado', detail: 'Atendimento de urgência e emergência' },
  { id: 'ex-bomb', label: 'Corpo de Bombeiros Militar', detail: 'Operações de socorro e combate a incêndios' },
];

// Helper: Normalize String for Search
function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

// Haversine formula distance in meters
function haversineDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Nominatim OpenStreetMap Async Hybrid Search Engine
async function searchNominatim(query: string): Promise<CityNode[]> {
  if (!query || query.trim().length < 3) return [];
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=br&limit=6`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(4000),
      headers: {
        'Accept-Language': 'pt-BR,pt;q=0.9'
      }
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data.map((item: any) => {
      const parts = (item.display_name || '').split(',').map((s: string) => s.trim());
      const name = parts[0] || 'Localidade';
      const region = parts.slice(1, 3).join(', ') || 'Brasil';
      return {
        id: `nom-${item.place_id}`,
        name: name,
        uf: 'BR',
        region: region,
        locationType: 'external' as const,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon)
      };
    });
  } catch (err) {
    return [];
  }
}

export interface CalculatedRouteResult {
  routeName: string;
  pathCities: CityNode[];
  pathHighways: string[];
  gantries: GantryDef[];
  totalBaseCents: number;
  totalCalculatedFee: number;
  distanceKm?: number;
  durationMinutes?: number;
  routeGeometry?: [number, number][];
  isRealOSRM?: boolean;
}

// Fallback Graph Traversal for Multi-Leg Routes
function findMultiStopRoutesFallback(validStops: CityNode[], multiplier: number): CalculatedRouteResult[] {
  if (validStops.length < 2) return [];

  interface GraphEdge {
    target: string;
    highway: string;
    gantriesForward: string[];
  }

  const adj: Record<string, GraphEdge[]> = {};
  CITIES.forEach(c => { adj[c.id] = []; });

  ROUTE_EDGES.forEach(e => {
    if (adj[e.from]) adj[e.from].push({ target: e.to, highway: e.highway, gantriesForward: e.gantries });
    if (adj[e.to]) adj[e.to].push({ target: e.from, highway: e.highway, gantriesForward: [...e.gantries].reverse() });
  });

  let combinedPathCities: CityNode[] = [];
  let combinedHighways: string[] = [];
  let combinedGantryIds: string[] = [];

  for (let i = 0; i < validStops.length - 1; i++) {
    const originId = validStops[i].id;
    const destinationId = validStops[i + 1].id;

    interface PathState {
      node: string;
      cities: string[];
      highways: string[];
      gantryIds: string[];
    }

    const queue: PathState[] = [{ node: originId, cities: [originId], highways: [], gantryIds: [] }];
    let bestLegPath: PathState | null = null;

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (curr.node === destinationId) {
        bestLegPath = curr;
        break;
      }

      for (const edge of adj[curr.node] || []) {
        if (!curr.cities.includes(edge.target)) {
          queue.push({
            node: edge.target,
            cities: [...curr.cities, edge.target],
            highways: [...curr.highways, edge.highway],
            gantryIds: [...curr.gantryIds, ...edge.gantriesForward]
          });
        }
      }
    }

    if (bestLegPath) {
      const legCities = bestLegPath.cities.map(id => CITIES.find(c => c.id === id)!).filter(Boolean);
      if (i === 0) {
        combinedPathCities.push(...legCities);
      } else {
        combinedPathCities.push(...legCities.slice(1));
      }
      combinedHighways.push(...bestLegPath.highways);
      combinedGantryIds.push(...bestLegPath.gantryIds);
    } else {
      if (i === 0) combinedPathCities.push(validStops[i]);
      combinedPathCities.push(validStops[i + 1]);
    }
  }

  const uniqueGantryIds = Array.from(new Set(combinedGantryIds));
  const gantries = uniqueGantryIds.map(gid => GANATRIES_MAP[gid]).filter(Boolean);

  let totalBaseCents = 0;
  let totalCalculatedCents = 0;

  gantries.forEach(g => {
    const baseCents = Math.round(g.baseFee * 100);
    const feeCents = Math.round(baseCents * multiplier);
    totalBaseCents += baseCents;
    totalCalculatedCents += feeCents;
  });

  return [{
    routeName: `Rota Multi-Paradas (${validStops.length} pontos)`,
    pathCities: combinedPathCities,
    pathHighways: combinedHighways,
    gantries,
    totalBaseCents: totalBaseCents / 100,
    totalCalculatedFee: totalCalculatedCents / 100,
    isRealOSRM: false
  }];
}

// OSRM Multi-Stop Chain Routing Engine
async function fetchRealMultiStopRoutes(
  validStops: CityNode[], 
  multiplier: number
): Promise<CalculatedRouteResult[]> {
  if (validStops.length < 2) return [];

  try {
    const coordsStr = validStops.map(s => `${s.lng},${s.lat}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${coordsStr}?overview=full&geometries=geojson&alternatives=true`;
    
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error('OSRM multi-stop request failed');

    const data = await res.json();
    if (!data.routes || data.routes.length === 0) {
      throw new Error('No OSRM multi-stop route found');
    }

    const fallbackPaths = findMultiStopRoutesFallback(validStops, multiplier);
    const allGantries = Object.values(GANATRIES_MAP);

    const results: CalculatedRouteResult[] = data.routes.map((route: any, routeIdx: number) => {
      const coords: [number, number][] = route.geometry.coordinates; // GeoJSON [lng, lat]
      const routeGeometry: [number, number][] = coords.map(([lng, lat]) => [lat, lng]);

      const distanceKm = Math.round((route.distance / 1000) * 10) / 10;
      const durationMinutes = Math.round(route.duration / 60);

      const detectedGantriesWithIdx: { gantry: GantryDef; idx: number }[] = [];

      allGantries.forEach(gantry => {
        let minDistance = Infinity;
        let minIdx = -1;

        for (let i = 0; i < coords.length; i++) {
          const [pLng, pLat] = coords[i];
          const dist = haversineDistanceMeters(gantry.lat, gantry.lng, pLat, pLng);
          if (dist < minDistance) {
            minDistance = dist;
            minIdx = i;
          }
        }

        if (minDistance <= 1500) {
          detectedGantriesWithIdx.push({ gantry, idx: minIdx });
        }
      });

      detectedGantriesWithIdx.sort((a, b) => a.idx - b.idx);
      const gantries = detectedGantriesWithIdx.map(item => item.gantry);

      let totalBaseCents = 0;
      let totalCalculatedCents = 0;

      gantries.forEach(g => {
        const baseCents = Math.round(g.baseFee * 100);
        const feeCents = Math.round(baseCents * multiplier);
        totalBaseCents += baseCents;
        totalCalculatedCents += feeCents;
      });

      const fallbackItem = fallbackPaths[0];

      return {
        routeName: routeIdx === 0 ? `Rota Principal (${validStops.length} pontos)` : `Opção Alternativa ${routeIdx + 1}`,
        pathCities: validStops,
        pathHighways: fallbackItem?.pathHighways || [],
        gantries,
        totalBaseCents: totalBaseCents / 100,
        totalCalculatedFee: totalCalculatedCents / 100,
        distanceKm,
        durationMinutes,
        routeGeometry,
        isRealOSRM: true
      };
    });

    return results;
  } catch (err) {
    return findMultiStopRoutesFallback(validStops, multiplier);
  }
}

// Hook to safely load Leaflet CSS & JS dynamically
function useLeaflet() {
  const [loaded, setLoaded] = useState<boolean>(typeof window !== 'undefined' && !!(window as any).L);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any).L) {
      setLoaded(true);
      return;
    }

    const cssId = 'leaflet-official-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const scriptId = 'leaflet-official-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setLoaded(true);
      document.head.appendChild(script);
    } else {
      const script = document.getElementById(scriptId) as HTMLScriptElement;
      const onLoad = () => setLoaded(true);
      script.addEventListener('load', onLoad);
    }
  }, []);

  return loaded;
}

// Sub-Component: Interactive Leaflet Route Map
interface InteractiveRouteMapProps {
  stops: (CityNode | null)[];
  availableRoutes: CalculatedRouteResult[];
  selectedRouteIndex: number;
  effectiveMultiplier: number;
  highlightGantry: GantryDef | null;
}

const InteractiveRouteMap: React.FC<InteractiveRouteMapProps> = ({
  stops,
  availableRoutes,
  selectedRouteIndex,
  effectiveMultiplier,
  highlightGantry
}) => {
  const isLeafletLoaded = useLeaflet();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);
  const gantryMarkersRef = useRef<Record<string, any>>({});

  const validStops = useMemo(() => stops.filter((s): s is CityNode => s !== null), [stops]);
  const activeRoute = availableRoutes[selectedRouteIndex] || availableRoutes[0] || null;

  // Initialize Map
  useEffect(() => {
    if (!isLeafletLoaded || !mapContainerRef.current || mapInstanceRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    const map = L.map(mapContainerRef.current, {
      center: [-20.95, -53.30],
      zoom: 7,
      scrollWheelZoom: false,
      zoomControl: true
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    layerGroupRef.current = layerGroup;

    setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        layerGroupRef.current = null;
      }
    };
  }, [isLeafletLoaded]);

  // Handle FlyTo on Gantry Selection from list
  useEffect(() => {
    if (!mapInstanceRef.current || !highlightGantry) return;

    const map = mapInstanceRef.current;
    map.flyTo([highlightGantry.lat, highlightGantry.lng], 12, { duration: 0.8 });

    const marker = gantryMarkersRef.current[highlightGantry.id];
    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 850);
    }
  }, [highlightGantry]);

  // Trigger invalidateSize on route changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [availableRoutes, validStops]);

  // Update Markers, Route Lines & Bounds
  useEffect(() => {
    if (!isLeafletLoaded || !mapInstanceRef.current || !layerGroupRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    const map = mapInstanceRef.current;
    const group = layerGroupRef.current;

    group.clearLayers();
    gantryMarkersRef.current = {};

    const activeGantryIds = new Set(activeRoute?.gantries.map(g => g.id) || []);

    // 1. Plot All 14 Gantries
    Object.values(GANATRIES_MAP).forEach(gantry => {
      const isOnRoute = activeGantryIds.has(gantry.id);
      const calculatedFee = Math.round(gantry.baseFee * effectiveMultiplier * 100) / 100;

      let iconHtml = '';
      let iconSize: [number, number] = [32, 32];

      if (isOnRoute) {
        iconSize = [100, 28];
        const feeText = effectiveMultiplier === 0 ? 'R$ 0,00' : `R$ ${calculatedFee.toFixed(2).replace('.', ',')}`;
        iconHtml = `
          <div class="px-2 py-1 bg-[#46973A] text-white border-2 border-white rounded-xl shadow-lg flex items-center justify-between gap-1 font-mono font-bold text-[11px] whitespace-nowrap cursor-pointer hover:scale-110 transition-transform transform -translate-x-1/2 -translate-y-1/2">
            <span>${gantry.code.replace('Pórtico-', 'P')}</span>
            <span class="bg-white/20 px-1 rounded text-[10px]">${feeText}</span>
          </div>
        `;
      } else {
        iconSize = [24, 24];
        iconHtml = `
          <div class="w-6 h-6 rounded-full bg-slate-500/80 text-white font-mono text-[10px] font-bold flex items-center justify-center border border-white shadow-xs opacity-75 hover:opacity-100 hover:scale-110 transition-all cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
            ${gantry.number.toString().padStart(2, '0')}
          </div>
        `;
      }

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-gantry-marker',
        iconSize: iconSize,
        iconAnchor: [iconSize[0] / 2, iconSize[1] / 2]
      });

      const popupHtml = `
        <div class="p-2 text-slate-800 text-xs font-sans min-w-[210px]">
          <div class="font-bold text-sm text-[#1A2B49] border-b border-slate-200 pb-1 mb-1.5 flex items-center justify-between">
            <span>${gantry.code}</span>
            <span class="text-[10px] font-mono text-[#46973A] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">${gantry.highway}</span>
          </div>
          <div class="space-y-1 text-[11px] text-slate-600">
            <div><strong>Município:</strong> ${gantry.city}</div>
            <div><strong>Estaca/KM:</strong> ${gantry.kmDisplay}</div>
            <div class="text-[10px] font-mono text-slate-500">KM Decl: ${gantry.declaredKm} | KM Est: ${gantry.estimatedKm}</div>
            <div class="text-[10px] font-mono text-slate-500">Distância ao Eixo: ${gantry.axisDistanceM} m</div>
            <div class="pt-1.5 mt-1.5 border-t border-slate-100 flex items-center justify-between font-mono">
              <span class="text-slate-500">Tarifa Base:</span>
              <span class="font-bold text-slate-800">R$ ${gantry.baseFee.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="flex items-center justify-between font-mono font-bold text-[#1A2B49] bg-slate-50 p-1.5 rounded-lg border border-slate-200">
              <span>Valor Categoria (${effectiveMultiplier}x):</span>
              <span class="text-[#46973A] text-xs font-extrabold">${effectiveMultiplier === 0 ? 'ISENTO (R$ 0,00)' : 'R$ ' + calculatedFee.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        </div>
      `;

      const marker = L.marker([gantry.lat, gantry.lng], { icon: customIcon }).bindPopup(popupHtml);
      gantryMarkersRef.current[gantry.id] = marker;
      group.addLayer(marker);
    });

    // 2. Plot Multi-Stop Markers
    validStops.forEach((stop, idx) => {
      const isOrigin = idx === 0;
      const isDestination = idx === validStops.length - 1;

      let labelText = `Parada ${idx}: ${stop.name}`;
      let bgClass = 'bg-amber-600';
      let dotColor = 'bg-amber-300';

      if (isOrigin) {
        labelText = `Saída: ${stop.name}`;
        bgClass = 'bg-[#1A2B49]';
        dotColor = 'bg-emerald-400';
      } else if (isDestination) {
        labelText = `Chegada: ${stop.name}`;
        bgClass = 'bg-[#46973A]';
        dotColor = 'bg-white';
      }

      const stopIcon = L.divIcon({
        html: `
          <div class="px-2.5 py-1 ${bgClass} text-white border-2 border-white rounded-xl shadow-md font-sans text-xs font-extrabold flex items-center gap-1 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
            <span class="w-2 h-2 rounded-full ${dotColor} ${isDestination ? 'animate-pulse' : ''}"></span>
            <span>${labelText}</span>
          </div>
        `,
        className: 'custom-stop-marker',
        iconSize: [130, 26],
        iconAnchor: [65, 13]
      });

      L.marker([stop.lat, stop.lng], { icon: stopIcon }).addTo(group);
    });

    // 3. Draw Unselected Alternative Routes
    availableRoutes.forEach((route, idx) => {
      if (idx !== selectedRouteIndex && route.routeGeometry && route.routeGeometry.length > 0) {
        L.polyline(route.routeGeometry, {
          color: '#64748B',
          weight: 4,
          opacity: 0.5,
          dashArray: '8, 8',
          lineCap: 'round'
        }).addTo(group);
      }
    });

    // 4. Draw Active Selected Route Polyline
    if (activeRoute && validStops.length >= 2) {
      let polylinePoints: [number, number][] = [];

      if (activeRoute.routeGeometry && activeRoute.routeGeometry.length > 0) {
        polylinePoints = activeRoute.routeGeometry;
      } else {
        polylinePoints = validStops.map(s => [s.lat, s.lng] as [number, number]);
      }

      if (polylinePoints.length >= 2) {
        const outerLine = L.polyline(polylinePoints, {
          color: '#1A2B49',
          weight: 7,
          opacity: 0.85,
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(group);

        L.polyline(polylinePoints, {
          color: '#46973A',
          weight: 4,
          opacity: 1.0,
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(group);

        map.fitBounds(outerLine.getBounds(), { padding: [45, 45], maxZoom: 13 });
      }
    } else {
      map.setView([-20.95, -53.30], 7);
    }

  }, [isLeafletLoaded, validStops, availableRoutes, selectedRouteIndex, effectiveMultiplier]);

  return (
    <div className="relative w-full h-[440px] lg:h-[480px] rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-slate-100">
      {!isLeafletLoaded ? (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-2 text-slate-500 bg-slate-50">
          <Loader2 className="w-8 h-8 text-[#46973A] animate-spin" />
          <span className="text-xs font-semibold">Carregando mapa interativo da concessão...</span>
        </div>
      ) : (
        <div ref={mapContainerRef} className="w-full h-full z-10" />
      )}

      {/* Visual Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 right-3 sm:right-auto z-20 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200 shadow-lg text-[11px] font-semibold text-slate-800 flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#46973A] border border-white shadow-2xs" />
          <span>Pórtico na Rota</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-white" />
          <span>Demais Pórticos (14 Total)</span>
        </span>
        {validStops.length >= 2 && (
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-1 rounded bg-[#46973A]" />
            <span>Trajeto Multi-Paradas</span>
          </span>
        )}
      </div>
    </div>
  );
};

export const RouteTollCalculator: React.FC = () => {
  // Phase 6 Multi-Stop Routing Array (Minimum 2 required stops)
  const [stops, setStops] = useState<(CityNode | null)[]>([null, null]);
  const [stopSearches, setStopSearches] = useState<string[]>(['', '']);

  // Phase 7 Official Concession Vehicle Category Selection
  const [selectedOfficialCategory, setSelectedOfficialCategory] = useState<OfficialVehicleCategory>(OFFICIAL_CATEGORIES[0]);
  const [customAxisCount, setCustomAxisCount] = useState<number>(7);
  const [selectedExemption, setSelectedExemption] = useState<ExemptionType>(EXEMPTION_TYPES[0]);

  // Phase 6 Nominatim Async Hybrid Search States
  const [openDropdownIdx, setOpenDropdownIdx] = useState<number | null>(null);
  const [asyncNominatimResults, setAsyncNominatimResults] = useState<Record<number, CityNode[]>>({});
  const [isSearchingExternal, setIsSearchingExternal] = useState<Record<number, boolean>>({});

  // Simulation Toggles
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [hasTagDiscount, setHasTagDiscount] = useState<boolean>(false);

  // Routes & Interactivity State
  const [availableRoutes, setAvailableRoutes] = useState<CalculatedRouteResult[]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [highlightGantry, setHighlightGantry] = useState<GantryDef | null>(null);
  const [copyToast, setCopyToast] = useState(false);

  // References for outside click dismissal
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdownIdx(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute effective multiplier (including CAT 9 custom axis count [7-12])
  const effectiveMultiplier = useMemo(() => {
    if (selectedOfficialCategory.id === 'cat-isento') return 0;
    if (selectedOfficialCategory.isCustomAxisCount) {
      return Math.max(7, Math.min(12, customAxisCount));
    }
    return selectedOfficialCategory.baseMultiplier;
  }, [selectedOfficialCategory, customAxisCount]);

  // Debounced Nominatim Search Effect
  useEffect(() => {
    if (openDropdownIdx === null) return;
    const idx = openDropdownIdx;
    const searchVal = stopSearches[idx] || '';

    if (!searchVal || searchVal.trim().length < 3) {
      setAsyncNominatimResults(prev => ({ ...prev, [idx]: [] }));
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingExternal(prev => ({ ...prev, [idx]: true }));
      const externalResults = await searchNominatim(searchVal);
      setAsyncNominatimResults(prev => ({ ...prev, [idx]: externalResults }));
      setIsSearchingExternal(prev => ({ ...prev, [idx]: false }));
    }, 300);

    return () => clearTimeout(timer);
  }, [openDropdownIdx, stopSearches]);

  // Filter valid non-null stops
  const validStops = useMemo(() => stops.filter((s): s is CityNode => s !== null), [stops]);

  // Calculate Routes whenever stops or vehicle multiplier change
  useEffect(() => {
    if (validStops.length < 2) {
      setAvailableRoutes([]);
      setSelectedRouteIndex(0);
      setIsLoadingRoute(false);
      return;
    }

    let isSubscribed = true;
    setIsLoadingRoute(true);

    fetchRealMultiStopRoutes(validStops, effectiveMultiplier).then(routes => {
      if (isSubscribed) {
        setAvailableRoutes(routes);
        setSelectedRouteIndex(0);
        setIsLoadingRoute(false);
      }
    });

    return () => { isSubscribed = false; };
  }, [validStops, effectiveMultiplier]);

  const activeRoute = availableRoutes[selectedRouteIndex] || availableRoutes[0] || null;

  // Cost Simulation Calculations
  const simulatedCost = useMemo(() => {
    if (!activeRoute) return null;

    if (selectedOfficialCategory.id === 'cat-isento') {
      return {
        originalFee: 0,
        discountSavings: 0,
        finalFee: 0,
        isExempt: true
      };
    }

    let baseCents = activeRoute.gantries.reduce((acc, g) => {
      return acc + Math.round(g.baseFee * effectiveMultiplier * 100);
    }, 0);

    if (isRoundTrip) {
      baseCents = baseCents * 2;
    }

    const discountCents = hasTagDiscount ? Math.round(baseCents * 0.05) : 0;
    const finalCents = baseCents - discountCents;

    return {
      originalFee: baseCents / 100,
      discountSavings: discountCents / 100,
      finalFee: finalCents / 100,
      isExempt: false
    };
  }, [activeRoute, selectedOfficialCategory, effectiveMultiplier, isRoundTrip, hasTagDiscount]);

  // Stop Handlers
  const handleSelectStop = (idx: number, city: CityNode) => {
    const nextStops = [...stops];
    nextStops[idx] = city;
    setStops(nextStops);

    const nextSearches = [...stopSearches];
    nextSearches[idx] = city.name;
    setStopSearches(nextSearches);

    setOpenDropdownIdx(null);
  };

  const handleClearStop = (idx: number) => {
    const nextStops = [...stops];
    nextStops[idx] = null;
    setStops(nextStops);

    const nextSearches = [...stopSearches];
    nextSearches[idx] = '';
    setStopSearches(nextSearches);
  };

  const handleAddStop = () => {
    if (stops.length >= 8) return;
    const nextStops = [...stops];
    nextStops.splice(nextStops.length - 1, 0, null);
    setStops(nextStops);

    const nextSearches = [...stopSearches];
    nextSearches.splice(nextSearches.length - 1, 0, '');
    setStopSearches(nextSearches);
  };

  const handleRemoveStop = (idx: number) => {
    if (stops.length <= 2) return;
    const nextStops = stops.filter((_, i) => i !== idx);
    setStops(nextStops);

    const nextSearches = stopSearches.filter((_, i) => i !== idx);
    setStopSearches(nextSearches);
  };

  const handleInvertStops = () => {
    const nextStops = [...stops].reverse();
    setStops(nextStops);

    const nextSearches = [...stopSearches].reverse();
    setStopSearches(nextSearches);
  };

  const handleCopySummary = () => {
    if (validStops.length < 2 || !activeRoute || !simulatedCost) return;

    const summaryText = `
=== RESUMO DE PEDÁGIO · CONCESSIONÁRIA CAMINHO DA CELULOSE ===
Paradas da Viagem (${validStops.length}):
${validStops.map((s, i) => `${i === 0 ? 'Ponto de Partida (Saída)' : i === validStops.length - 1 ? 'Destino Final' : `Parada ${i}`}: ${s.name} (${s.region})`).join('\n')}

Categoria: ${selectedOfficialCategory.name} (${effectiveMultiplier}x)
Tipo de Viagem: ${isRoundTrip ? 'Ida e Volta (2x)' : 'Apenas Ida'}
${simulatedCost.isExempt ? `Isenção Legal: ${selectedExemption.label}\n` : ''}Distância Total: ${activeRoute.distanceKm ? activeRoute.distanceKm + ' km' : 'N/A'} | Tempo Estimado: ${activeRoute.durationMinutes ? '~' + Math.floor(activeRoute.durationMinutes / 60) + 'h ' + (activeRoute.durationMinutes % 60) + 'm' : 'N/A'}
Rota: ${activeRoute.routeName}

PÓRTICOS INTERCEPTADOS NO TRAJETO (${activeRoute.gantries.length}):
${activeRoute.gantries.map((g, i) => `${i + 1}. ${g.code} (${g.highway} ${g.kmDisplay} - ${g.city}): ${simulatedCost.isExempt ? 'R$ 0,00 (Isento)' : 'R$ ' + (g.baseFee * effectiveMultiplier * (isRoundTrip ? 2 : 1)).toFixed(2).replace('.', ',')}`).join('\n')}

${hasTagDiscount && !simulatedCost.isExempt ? `Desconto TAG (5%): -R$ ${simulatedCost.discountSavings.toFixed(2).replace('.', ',')}\n` : ''}VALOR TOTAL ESTIMADO: R$ ${simulatedCost.finalFee.toFixed(2).replace('.', ',')}
Regulamentado pela AGEMS · 30 dias para pagamento digital sem TAG.
`.trim();

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 3000);
    });
  };

  const googleMapsUrl = useMemo(() => {
    if (validStops.length < 2) return '#';
    const origin = validStops[0].name + ', MS';
    const destination = validStops[validStops.length - 1].name + ', MS';
    const waypoints = validStops.slice(1, -1).map(s => encodeURIComponent(s.name + ', MS')).join('|');
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}${waypoints ? `&waypoints=${waypoints}` : ''}&travelmode=driving`;
  }, [validStops]);

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1A2B49] via-[#16243E] to-[#0D182B] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-200/20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#46973A]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-xs text-xs font-semibold text-emerald-300 tracking-wider uppercase mb-3 border border-white/10">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulador Multi-Paradas & Arrecadação Free Flow</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Calculadora Oficial de Pedágio por Rota
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
            Monte itinerários com múltiplos pontos de parada, selecione a categoria oficial do veículo e calcule os pórticos interceptados em tempo real na malha rodoviária.
          </p>
        </div>
      </div>

      {/* Split-Screen Desktop Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: Trip Configuration Panel (lg:col-span-5) */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Bloco 1: Defina o Trajeto da Viagem (Multi-Inputs) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#46973A] uppercase tracking-wider">
                <Navigation className="w-4 h-4 text-[#46973A]" />
                <span>1. Defina o Trajeto ({stops.length} Paradas)</span>
              </div>

              {stops.length > 2 && (
                <button
                  type="button"
                  onClick={() => {
                    setStops([null, null]);
                    setStopSearches(['', '']);
                  }}
                  className="text-[10px] text-rose-600 font-semibold hover:underline cursor-pointer"
                >
                  Resetar
                </button>
              )}
            </div>

            {/* Dynamic Stop Inputs List */}
            <div className="space-y-3">
              {stops.map((stopNode, idx) => {
                const isOrigin = idx === 0;
                const isDestination = idx === stops.length - 1;
                const fieldLabel = isOrigin 
                  ? 'Ponto de Partida (Saindo de...)' 
                  : isDestination 
                  ? 'Destino Final (Indo para...)' 
                  : `Parada ${idx} (Intermediária)`;

                const isOpen = openDropdownIdx === idx;
                const searchVal = stopSearches[idx] || '';

                const localMatches = CITIES.filter(c => 
                  normalizeText(c.name).includes(normalizeText(searchVal)) || 
                  normalizeText(c.region).includes(normalizeText(searchVal)) ||
                  normalizeText(c.uf).includes(normalizeText(searchVal))
                );

                const nomResults = asyncNominatimResults[idx] || [];
                const isSearching = isSearchingExternal[idx] || false;

                return (
                  <div key={idx} className="relative" ref={isOpen ? dropdownRef : null}>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isOrigin ? 'bg-[#1A2B49]' : isDestination ? 'bg-[#46973A]' : 'bg-amber-500'}`} />
                        <span>{fieldLabel}</span>
                      </span>

                      <div className="flex items-center gap-2">
                        {stopNode && (
                          <button 
                            type="button" 
                            onClick={() => handleClearStop(idx)}
                            className="text-[10px] text-slate-400 hover:text-rose-600 font-semibold cursor-pointer"
                          >
                            Limpar
                          </button>
                        )}
                        {!isOrigin && !isDestination && stops.length > 2 && (
                          <button 
                            type="button" 
                            onClick={() => handleRemoveStop(idx)}
                            title="Remover esta parada"
                            className="text-[10px] text-rose-600 hover:bg-rose-50 px-1.5 py-0.5 rounded font-bold cursor-pointer flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remover</span>
                          </button>
                        )}
                      </div>
                    </label>

                    <div className="relative">
                      <MapPin className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${isOrigin ? 'text-[#1A2B49]' : isDestination ? 'text-[#46973A]' : 'text-amber-600'}`} />
                      <input
                        type="text"
                        value={searchVal}
                        onFocus={() => setOpenDropdownIdx(idx)}
                        onChange={(e) => {
                          const val = e.target.value;
                          const nextSearches = [...stopSearches];
                          nextSearches[idx] = val;
                          setStopSearches(nextSearches);
                          setOpenDropdownIdx(idx);
                        }}
                        placeholder={isOrigin ? "Saindo de..." : isDestination ? "Indo para..." : `Ponto de parada ${idx}...`}
                        className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 text-xs font-medium rounded-xl text-slate-900 focus:bg-white focus:border-[#46973A] focus:ring-2 focus:ring-[#46973A]/20 focus:outline-none transition-all"
                      />
                      {isSearching ? (
                        <Loader2 className="w-3.5 h-3.5 text-[#46973A] animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      )}
                    </div>

                    {/* Autocomplete Dropdown combining local + Nominatim OSM results */}
                    {isOpen && (
                      <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl max-h-60 overflow-y-auto p-1.5 space-y-1">
                        
                        {/* Local MS Matches */}
                        {localMatches.length > 0 && (
                          <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Concessão / MS ({localMatches.length}):
                          </div>
                        )}
                        {localMatches.map(c => {
                          const isSelected = stopNode?.id === c.id;
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => handleSelectStop(idx, c)}
                              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                                isSelected ? 'bg-[#1A2B49] text-white' : 'hover:bg-slate-100 text-slate-800'
                              }`}
                            >
                              <span className="flex items-center gap-2 truncate pr-2">
                                {c.locationType === 'municipality' ? (
                                  <Building2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-300' : 'text-slate-500'}`} />
                                ) : c.locationType === 'district' ? (
                                  <Landmark className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-300' : 'text-amber-600'}`} />
                                ) : (
                                  <Factory className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-cyan-300' : 'text-cyan-600'}`} />
                                )}
                                <span className="truncate">{c.name} / {c.uf}</span>
                              </span>

                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase shrink-0 ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                              }`}>
                                {c.locationType === 'municipality' ? 'Município' : c.locationType === 'district' ? 'Distrito' : 'Ponto Ref.'}
                              </span>
                            </button>
                          );
                        })}

                        {/* Nominatim External OpenStreetMap Results */}
                        {nomResults.length > 0 && (
                          <>
                            <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider pt-2 border-t border-slate-100">
                              OpenStreetMap / Brasil:
                            </div>
                            {nomResults.map(c => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => handleSelectStop(idx, c)}
                                className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between hover:bg-slate-100 text-slate-800 transition-colors cursor-pointer"
                              >
                                <span className="flex items-center gap-2 truncate pr-2">
                                  <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                  <span className="truncate">{c.name}</span>
                                </span>
                                <span className="text-[9px] bg-blue-100 text-blue-800 font-mono px-1.5 py-0.5 rounded shrink-0">
                                  Geo BR
                                </span>
                              </button>
                            ))}
                          </>
                        )}

                        {localMatches.length === 0 && nomResults.length === 0 && !isSearching && (
                          <div className="p-3 text-xs text-slate-500 text-center font-medium">
                            Digite para buscar no MS ou em todo o Brasil...
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* Buttons: Add Stop (+) and Invert */}
            <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleAddStop}
                disabled={stops.length >= 8}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#46973A] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-emerald-200 shadow-2xs disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Parada (+)</span>
              </button>

              <button
                type="button"
                onClick={handleInvertStops}
                title="Inverter Ordem da Rota"
                className="px-3 py-1.5 bg-slate-100 hover:bg-[#1A2B49] hover:text-white text-slate-700 rounded-xl transition-all font-semibold text-xs cursor-pointer border border-slate-200 flex items-center gap-1"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-[#46973A]" />
                <span>Inverter Ordem</span>
              </button>
            </div>

          </div>

          {/* Phase 7 Requirement 1: Official Concession Categories Dropdown (<select>) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#46973A] uppercase tracking-wider">
              <Truck className="w-4 h-4 text-[#46973A]" />
              <span>2. Categoria Tarifária do Veículo (Free Flow)</span>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <Truck className="w-4 h-4 text-[#1A2B49] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedOfficialCategory.id}
                  onChange={(e) => {
                    const found = OFFICIAL_CATEGORIES.find(c => c.id === e.target.value);
                    if (found) setSelectedOfficialCategory(found);
                  }}
                  className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl text-slate-900 focus:bg-white focus:border-[#46973A] focus:ring-2 focus:ring-[#46973A]/20 focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  {OFFICIAL_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.wheelsType} • {cat.baseMultiplier > 0 ? `${cat.baseMultiplier}x` : 'Tarifa Zero'})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                <div className="font-bold text-[#1A2B49] flex items-center justify-between">
                  <span>{selectedOfficialCategory.code} · {selectedOfficialCategory.axesDescription}</span>
                  <span className="font-mono text-[#46973A] font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    Multiplicador {effectiveMultiplier}x
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  <strong>Exemplos:</strong> {selectedOfficialCategory.exampleVehicles}
                </p>
              </div>

              {/* CAT 9 Custom Axis Count Sub-input [7 to 12] */}
              {selectedOfficialCategory.isCustomAxisCount && (
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2B49]">
                      Informe a Quantidade Exata de Eixos (CAT 9):
                    </label>
                    <span className="text-[10px] text-slate-600">
                      De 7 a 12 eixos (Bitrem / Tritrem)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={7}
                      max={12}
                      value={customAxisCount}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) setCustomAxisCount(Math.max(7, Math.min(12, val)));
                      }}
                      className="w-16 px-2 py-1 text-center font-mono font-bold text-sm bg-white border border-slate-300 rounded-lg focus:border-[#46973A] focus:outline-none"
                    />
                    <span className="text-xs font-mono font-bold text-[#46973A]">{customAxisCount}x</span>
                  </div>
                </div>
              )}

              {/* Sub-selector for Exempt Vehicle Types */}
              {selectedOfficialCategory.id === 'cat-isento' && (
                <div className="p-3.5 bg-emerald-50/90 border border-emerald-200 rounded-2xl space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#46973A]" />
                      <span className="text-[11px] font-bold text-[#1A2B49] uppercase tracking-wider">
                        Modalidade de Isenção Legal
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold">
                      R$ 0,00
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {EXEMPTION_TYPES.map(ex => {
                      const isExSelected = selectedExemption.id === ex.id;
                      return (
                        <button
                          key={ex.id}
                          type="button"
                          onClick={() => setSelectedExemption(ex)}
                          className={`w-full p-2 rounded-xl border text-left transition-all text-xs cursor-pointer ${
                            isExSelected 
                              ? 'bg-[#1A2B49] text-white border-[#1A2B49] font-bold shadow-xs' 
                              : 'bg-white hover:bg-emerald-100/50 border-emerald-200 text-slate-800 font-medium'
                          }`}
                        >
                          <div className="font-semibold text-[11px] leading-tight">{ex.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Phase 7 Requirement 2: Google Maps Button placed IMMEDIATELY below Block 2 */}
          {validStops.length >= 2 && (
            <div className="animate-fadeIn pt-1">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-[#1A2B49] hover:bg-[#121E33] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md border border-[#1A2B49]"
              >
                <ExternalLink className="w-4 h-4 text-[#46973A]" />
                <span>Abrir Navegação no Google Maps</span>
              </a>
            </div>
          )}

        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Geographic Map Panel and Results (lg:col-span-7) */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top of Right Column: Interactive Leaflet Route Map */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#46973A] uppercase tracking-wider">
                <MapIcon className="w-4 h-4 text-[#46973A]" />
                <span>Mapa Geográfico Interativo do Trajeto (Leaflet)</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                14 Pórticos Free Flow no MS
              </span>
            </div>

            <InteractiveRouteMap
              stops={stops}
              availableRoutes={availableRoutes}
              selectedRouteIndex={selectedRouteIndex}
              effectiveMultiplier={effectiveMultiplier}
              highlightGantry={highlightGantry}
            />
          </div>

          {/* Below Map: Results or Empty State Banner */}
          {validStops.length < 2 ? (
            /* Blank State Card */
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1A2B49]/10 text-[#1A2B49] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6 text-[#46973A]" />
              </div>
              <h3 className="text-base font-bold text-[#1A2B49]">
                Selecione as Paradas do Trajeto ao lado
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Informe pelo menos o Ponto de Partida e o Destino no painel de configuração para traçar a rota multi-paradas, calcular os pórticos interceptados e consultar as tarifas.
              </p>
            </div>
          ) : isLoadingRoute ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs text-center flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#46973A] animate-spin" />
              <span className="text-sm font-semibold text-[#1A2B49]">Calculando rota e identificando pórticos interceptados...</span>
            </div>
          ) : activeRoute && simulatedCost ? (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Alternative Route Tabs Selector */}
              {availableRoutes.length > 1 && (
                <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
                  <span className="text-xs font-bold text-[#1A2B49] uppercase tracking-wider block">
                    Comparação de Corredores / Rotas Alternativas ({availableRoutes.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {availableRoutes.map((route, rIdx) => {
                      const isSelected = rIdx === selectedRouteIndex;
                      return (
                        <button
                          key={rIdx}
                          type="button"
                          onClick={() => setSelectedRouteIndex(rIdx)}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected 
                              ? 'bg-[#1A2B49] text-white border-[#1A2B49] shadow-md ring-2 ring-[#46973A]' 
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs">{route.routeName}</span>
                            {isSelected && (
                              <span className="bg-[#46973A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                                Ativa
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between text-xs font-mono mt-1.5 pt-1.5 border-t border-slate-200/50">
                            <span className={isSelected ? 'text-slate-300' : 'text-slate-600'}>
                              {route.distanceKm ? route.distanceKm + ' km' : ''} ({route.gantries.length} {route.gantries.length === 1 ? 'pórtico' : 'pórticos'})
                            </span>
                            <span className={`font-bold ${isSelected ? 'text-emerald-300' : 'text-[#46973A]'}`}>
                              {selectedOfficialCategory.id === 'cat-isento' ? 'R$ 0,00' : `R$ ${route.totalCalculatedFee.toFixed(2).replace('.', ',')}`}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Financial Summary Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-[#46973A] uppercase tracking-wider block">
                        Resultado do Trajeto ({validStops.length} Paradas)
                      </span>
                      {activeRoute.distanceKm && (
                        <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                          <Compass className="w-3.5 h-3.5 text-[#46973A]" />
                          Distância: {activeRoute.distanceKm} km
                        </span>
                      )}
                      {activeRoute.durationMinutes && (
                        <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-700" />
                          Tempo: ~{Math.floor(activeRoute.durationMinutes / 60)}h {activeRoute.durationMinutes % 60}m
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-extrabold text-[#1A2B49]">
                      Resumo Tarifário da Viagem
                    </h2>
                  </div>

                  {/* Total Highlight Banner */}
                  <div className="bg-gradient-to-r from-[#1A2B49] to-[#21375e] text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 border border-[#46973A]/40 shadow-sm min-w-[280px]">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 block">
                        {simulatedCost.isExempt ? 'Status Tarifário' : 'Valor Total Calculado'}
                      </span>
                      
                      {hasTagDiscount && !simulatedCost.isExempt && (
                        <span className="text-xs font-mono text-slate-300 line-through block">
                          De: R$ {simulatedCost.originalFee.toFixed(2).replace('.', ',')}
                        </span>
                      )}

                      <span className="text-2xl font-extrabold font-mono text-emerald-400 tabular-nums">
                        {simulatedCost.isExempt ? 'R$ 0,00' : `R$ ${simulatedCost.finalFee.toFixed(2).replace('.', ',')}`}
                      </span>

                      {simulatedCost.isExempt ? (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30 block mt-1">
                          Isenção Legal ({selectedExemption.label})
                        </span>
                      ) : hasTagDiscount ? (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30 block mt-1">
                          Economia de R$ {simulatedCost.discountSavings.toFixed(2).replace('.', ',')} com TAG
                        </span>
                      ) : null}
                    </div>

                    {!simulatedCost.isExempt && (
                      <div className="border-t sm:border-t-0 sm:border-l border-white/20 pt-2.5 sm:pt-0 sm:pl-3.5 space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isRoundTrip}
                            onChange={(e) => setIsRoundTrip(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#46973A] relative"></div>
                          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                            <Repeat className="w-3 h-3 text-emerald-300" />
                            <span>Ida e Volta (2x)</span>
                          </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={hasTagDiscount}
                            onChange={(e) => setHasTagDiscount(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#46973A] relative"></div>
                          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                            <Percent className="w-3 h-3 text-amber-300" />
                            <span>Desconto TAG (5%)</span>
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Copy Summary Action */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="px-4 py-2.5 rounded-xl bg-[#1A2B49] hover:bg-[#121E33] text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                  >
                    {copyToast ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Resumo Copiado para a Área de Transferência!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-emerald-400" />
                        <span>Copiar Resumo da Rota</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Legal Exemption Informative Banner */}
                {simulatedCost.isExempt && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-medium flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#46973A] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-bold text-emerald-900">
                        Veículo Enquadrado em Isenção Tarifária Legal
                      </div>
                      <div className="text-emerald-800 leading-relaxed">
                        A modalidade <strong>"{selectedExemption.label}"</strong> possui tarifa R$ 0,00 regulamentada pelo Contrato de Concessão da Malha da Celulose e Portaria AGEMS. A passagem pelos pórticos é registrada sem geração de cobrança financeira.
                      </div>
                    </div>
                  </div>
                )}

                {/* Sequence of Stops */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Sequência de Paradas da Viagem:
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-800">
                    {validStops.map((stop, idx) => (
                      <React.Fragment key={`${stop.id}-${idx}`}>
                        <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[#1A2B49] flex items-center gap-1.5 shadow-2xs">
                          <MapPin className={`w-3.5 h-3.5 ${idx === 0 ? 'text-[#1A2B49]' : idx === validStops.length - 1 ? 'text-[#46973A]' : 'text-amber-600'}`} />
                          <span>{idx === 0 ? 'Saída' : idx === validStops.length - 1 ? 'Chegada' : `Parada ${idx}`}: <strong>{stop.name}</strong></span>
                        </span>
                        {idx < validStops.length - 1 && (
                          <span className="flex items-center text-slate-400 font-mono text-[11px] gap-1">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Ordered Gantries List with FlyTo Interactivity */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Pórticos Interceptados na Ordem de Tráfego:
                    </span>
                    <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                      Clique em "Ver no mapa" para dar zoom no pórtico
                    </span>
                  </div>

                  {activeRoute.gantries.length > 0 ? (
                    <div className="space-y-2.5">
                      {activeRoute.gantries.map((gantry, idx) => {
                        let fee = Math.round(gantry.baseFee * effectiveMultiplier * 100) / 100;
                        if (isRoundTrip && !simulatedCost.isExempt) fee = fee * 2;
                        if (hasTagDiscount && !simulatedCost.isExempt) fee = Math.round(fee * 0.95 * 100) / 100;

                        return (
                          <div 
                            key={`${gantry.id}-${idx}`}
                            className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs group"
                          >
                            <div className="flex items-start gap-3">
                              <span className="w-7 h-7 rounded-xl bg-[#1A2B49] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                {idx + 1}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm text-[#1A2B49]">
                                    {gantry.code}
                                  </span>
                                  <span className="text-xs font-mono font-bold text-[#46973A] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                    {gantry.highway} · {gantry.kmDisplay}
                                  </span>
                                </div>
                                <span className="text-xs text-slate-500 mt-0.5 block">
                                  Município de Referência: <strong>{gantry.city}</strong>
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 justify-between sm:justify-end">
                              <button
                                type="button"
                                onClick={() => setHighlightGantry(gantry)}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-[#1A2B49] hover:text-white text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <MapPin className="w-3.5 h-3.5 text-[#46973A]" />
                                <span>Ver no mapa</span>
                              </button>

                              <span className={`text-base font-extrabold font-mono tabular-nums px-3 py-1 rounded-xl ${
                                simulatedCost.isExempt 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-slate-100 text-[#1A2B49]'
                              }`}>
                                {simulatedCost.isExempt ? 'R$ 0,00' : `R$ ${fee.toFixed(2).replace('.', ',')}`}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                      <span>Isenção de Pórticos: A rota percorrida não intercepta nenhum pórtico de cobrança de pedágio eletrônico da concessão.</span>
                    </div>
                  )}
                </div>

                {/* Regulatory Note */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#1A2B49] shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong>Regulamentação AGEMS:</strong> As tarifas são fixadas para o sistema de pedágio eletrônico sem cancelas da Concessionária Caminhos da Celulose. Veículos sem TAG possuem até <strong>30 dias corridos</strong> para realizar o pagamento digital da tarifa antes de configurar infração de trânsito pelo Art. 209-A do CTB.
                  </div>
                </div>

              </div>
            </div>
          ) : null}

        </div>

      </div>

    </div>
  );
};
