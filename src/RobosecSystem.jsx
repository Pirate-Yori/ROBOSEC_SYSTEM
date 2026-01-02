import React, { useState, useEffect } from 'react';
import { Shield, Radio, AlertTriangle, Map, Activity, Clock, Settings, Power, Navigation, Eye, Bell, Cpu, Camera, Waves, Mic, Zap, Menu, X } from 'lucide-react';

export default function RobosecSystem() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [robotStatus, setRobotStatus] = useState('active');
  const [patrolMode, setPatrolMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Mouvement détecté - Zone A', time: '14:23', status: 'new', sensor: 'Caméra IA + PIR' },
    { id: 2, type: 'info', message: 'Patrouille complétée - Circuit 1', time: '14:15', status: 'read', sensor: 'Système' },
    { id: 3, type: 'warning', message: 'Son anormal détecté - Zone C', time: '13:58', status: 'read', sensor: 'Audio' },
  ]);
  const [robotPosition, setRobotPosition] = useState({ x: 30, y: 40 });
  const [sensorData, setSensorData] = useState({
    camera: { status: 'active', confidence: 98 },
    pir: { status: 'active', detections: 3 },
    ultrasonic: { status: 'active', distance: 2.4 },
    audio: { status: 'active', level: 45 },
    ai: { status: 'processing', accuracy: 96 }
  });

  useEffect(() => {
    if (patrolMode && robotStatus === 'active') {
      const interval = setInterval(() => {
        setRobotPosition(prev => ({
          x: (prev.x + Math.random() * 10 - 5) % 90,
          y: (prev.y + Math.random() * 10 - 5) % 90
        }));
        
        // Simulate sensor data changes
        setSensorData(prev => ({
          ...prev,
          camera: { ...prev.camera, confidence: 95 + Math.floor(Math.random() * 5) },
          pir: { ...prev.pir, detections: Math.floor(Math.random() * 5) },
          ultrasonic: { ...prev.ultrasonic, distance: (2 + Math.random() * 2).toFixed(1) },
          audio: { ...prev.audio, level: 40 + Math.floor(Math.random() * 20) }
        }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [patrolMode, robotStatus]);

  const StatusCard = ({ icon: Icon, title, value, status }) => (
    <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-3 sm:p-4 hover:border-cyan-400 transition-all">
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <Icon className="text-cyan-400 w-5 h-5 sm:w-6 sm:h-6" />
        <span className="text-gray-400 text-xs sm:text-sm">{title}</span>
      </div>
      <div className="text-xl sm:text-2xl font-bold text-white">{value}</div>
      {status && (
        <div className={`mt-2 text-xs ${status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
          ● {status.toUpperCase()}
        </div>
      )}
    </div>
  );

  const SensorCard = ({ icon: Icon, name, status, metric, value }) => (
    <div className="bg-gray-800 border border-cyan-500/20 rounded-lg p-3 sm:p-4">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-2">
          <Icon className="text-cyan-400 w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-white font-medium text-sm sm:text-base">{name}</span>
        </div>
        <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
      </div>
      <div className="text-xs sm:text-sm text-gray-400">{metric}</div>
      <div className="text-lg sm:text-xl font-bold text-cyan-400 mt-1">{value}</div>
    </div>
  );

  const AlertItem = ({ alert }) => (
    <div className={`bg-gray-900 border ${alert.type === 'warning' ? 'border-yellow-500/50' : 'border-cyan-500/30'} rounded-lg p-3 sm:p-4 mb-3`}>
      <div className="flex items-start gap-2 sm:gap-3">
        <AlertTriangle className={`${alert.type === 'warning' ? 'text-yellow-400' : 'text-cyan-400'} w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm sm:text-base break-words">{alert.message}</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">{alert.time}</p>
          <p className="text-cyan-400 text-xs mt-2">📡 {alert.sensor}</p>
        </div>
        {alert.status === 'new' && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex-shrink-0">NEW</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-cyan-500/30 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Shield className="text-cyan-400 w-6 h-6 sm:w-8 sm:h-8" />
            <div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                ROBOSEC_SYSTEM
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm hidden sm:block">Surveillance Autonome par IA Multi-Capteurs</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2 bg-green-500/20 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-green-500/50">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium text-xs sm:text-sm">EN LIGNE</span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors sm:hidden"
            >
              {mobileMenuOpen ? <X className="text-gray-400 w-6 h-6" /> : <Menu className="text-gray-400 w-6 h-6" />}
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors hidden sm:block">
              <Settings className="text-gray-400 w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex relative">
        {/* Sidebar */}
        <div className={`fixed sm:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-cyan-500/30 min-h-screen p-4 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}>
          {/* Close button for mobile */}
          <div className="flex justify-end mb-4 sm:hidden">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="text-gray-400 w-6 h-6" />
            </button>
          </div>
          <nav className="space-y-2">
            {[
              { id: 'dashboard', icon: Activity, label: 'Tableau de Bord' },
              { id: 'sensors', icon: Cpu, label: 'Capteurs IA' },
              { id: 'map', icon: Map, label: 'Carte Patrouille' },
              { id: 'alerts', icon: Bell, label: 'Alertes' },
              { id: 'tech', icon: Zap, label: 'Technologies' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Robot Control */}
          <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-cyan-500/30">
            <h3 className="text-sm text-gray-400 mb-3">CONTRÔLE ROBOT</h3>
            <button
              onClick={() => setRobotStatus(robotStatus === 'active' ? 'standby' : 'active')}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                robotStatus === 'active'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30'
                  : 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30'
              }`}
            >
              <Power className="w-5 h-5" />
              {robotStatus === 'active' ? 'ARRÊTER' : 'DÉMARRER'}
            </button>
            <button
              onClick={() => setPatrolMode(!patrolMode)}
              className={`w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                patrolMode
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                  : 'bg-gray-700 text-gray-400 border border-gray-600'
              }`}
            >
              <Navigation className="w-5 h-5" />
              {patrolMode ? 'PATROUILLE AUTO' : 'MODE MANUEL'}
            </button>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto w-full">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Tableau de Bord</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatusCard icon={Shield} title="Statut Robot" value="Opérationnel" status={robotStatus} />
                <StatusCard icon={Eye} title="Zones Surveillées" value="8/8" status="active" />
                <StatusCard icon={AlertTriangle} title="Alertes Actives" value="1" />
                <StatusCard icon={Clock} title="Temps Patrouille" value="6h 42m" />
              </div>

              {/* Live Feed */}
              <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-4 sm:p-6 mb-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <Radio className="text-cyan-400 w-5 h-5" />
                  <span className="text-sm sm:text-base">Flux Vidéo en Direct - Vision IA</span>
                </h3>
                <div className="bg-black rounded-lg aspect-video flex items-center justify-center border border-cyan-500/20 relative overflow-hidden">
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-red-500/80 px-2 sm:px-3 py-1 rounded text-xs flex items-center gap-1 sm:gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="hidden sm:inline">REC - IA ACTIVE</span>
                    <span className="sm:hidden">REC</span>
                  </div>
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-cyan-500/80 px-2 sm:px-3 py-1 rounded text-xs">
                    {sensorData.camera.confidence}%
                  </div>
                  <div className="text-center">
                    <Eye className="text-cyan-400 mx-auto mb-2 w-10 h-10 sm:w-12 sm:h-12" />
                    <p className="text-gray-500">Caméra Active - Vision Nocturne</p>
                    <p className="text-cyan-400 text-sm mt-2">Détection en temps réel par IA</p>
                  </div>
                  {/* Scanning effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 animate-pulse"></div>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <Bell className="text-cyan-400 w-5 h-5" />
                  Alertes Récentes
                </h3>
                {alerts.slice(0, 3).map(alert => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sensors' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Capteurs IA Multi-Détection</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <SensorCard
                  icon={Camera}
                  name="Caméra + Vision IA"
                  status="active"
                  metric="Confiance de détection"
                  value={`${sensorData.camera.confidence}%`}
                />
                <SensorCard
                  icon={Waves}
                  name="Capteur PIR (Infrarouge)"
                  status="active"
                  metric="Détections mouvement"
                  value={`${sensorData.pir.detections} actives`}
                />
                <SensorCard
                  icon={Navigation}
                  name="Ultrason / LiDAR"
                  status="active"
                  metric="Distance obstacle"
                  value={`${sensorData.ultrasonic.distance}m`}
                />
                <SensorCard
                  icon={Mic}
                  name="Capteur Audio"
                  status="active"
                  metric="Niveau sonore"
                  value={`${sensorData.audio.level} dB`}
                />
              </div>

              <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center gap-2 flex-wrap">
                  <Cpu className="text-cyan-400" size={20} />
                  <span className="text-sm sm:text-base">Intelligence Artificielle - Précision: {sensorData.ai.accuracy}%</span>
                </h3>
                <div className="space-y-3 text-gray-300">
                  <p>✓ Détection de personnes et objets en temps réel</p>
                  <p>✓ Reconnaissance faciale (autorisés vs intrus)</p>
                  <p>✓ Analyse comportementale des mouvements suspects</p>
                  <p>✓ Apprentissage des patterns normaux de l'environnement</p>
                  <p>✓ Réduction des fausses alertes par fusion multi-capteurs</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'map' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Carte de Patrouille</h2>
              <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-4 sm:p-6">
                <div className="relative bg-gray-800 rounded-lg h-64 sm:h-96 border border-cyan-500/20">
                  <div className="absolute top-4 left-4 bg-cyan-500/20 border border-cyan-500 rounded px-2 py-1 text-xs">
                    Zone A - Entrée
                  </div>
                  <div className="absolute top-4 right-4 bg-cyan-500/20 border border-cyan-500 rounded px-2 py-1 text-xs">
                    Zone B - Bureau
                  </div>
                  <div className="absolute bottom-4 left-4 bg-cyan-500/20 border border-cyan-500 rounded px-2 py-1 text-xs">
                    Zone C - Entrepôt
                  </div>
                  
                  <div
                    className="absolute w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/50 transition-all duration-500"
                    style={{ left: `${robotPosition.x}%`, top: `${robotPosition.y}%` }}
                  >
                    <Navigation className="text-black" size={16} />
                  </div>
                  
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 10% 10% L 90% 10% L 90% 90% L 10% 90% Z"
                      stroke="rgba(34, 211, 238, 0.3)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                  </svg>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm">
                  <span className="text-gray-400 text-xs sm:text-sm">Circuit actuel: Principal (8 zones)</span>
                  <span className="text-cyan-400 text-xs sm:text-sm">Progression: 62%</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Alertes en Temps Réel</h2>
              <div className="space-y-3">
                {alerts.map(alert => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Technologies de Détection</h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 flex-wrap">
                    <Camera className="text-cyan-400" size={20} />
                    <span className="text-sm sm:text-base">1. Caméra + Vision par Ordinateur (IA)</span>
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Détection de personnes via algorithmes de deep learning</li>
                    <li>• Analyse des mouvements et comportements suspects</li>
                    <li>• Reconnaissance faciale (autorisés vs non-autorisés)</li>
                    <li>• Détection d'objets abandonnés ou déplacés</li>
                    <li>• Fonctionne en vision nocturne infrarouge</li>
                  </ul>
                </div>

                <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 flex-wrap">
                    <Waves className="text-cyan-400" size={20} />
                    <span className="text-sm sm:text-base">2. Capteurs PIR (Infrarouge Passif)</span>
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Détecte les changements de chaleur et mouvement</li>
                    <li>• Fonctionne même dans l'obscurité totale</li>
                    <li>• Complète la caméra pour réduire les faux négatifs</li>
                    <li>• Faible consommation d'énergie</li>
                    <li>• Portée jusqu'à 10 mètres</li>
                  </ul>
                </div>

                <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 flex-wrap">
                    <Navigation className="text-cyan-400" size={20} />
                    <span className="text-sm sm:text-base">3. Capteurs Ultrason / LiDAR</span>
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Détecte les obstacles et présences physiques</li>
                    <li>• Mesure précise des distances (cm)</li>
                    <li>• Cartographie 3D de l'environnement</li>
                    <li>• Navigation autonome sans collision</li>
                    <li>• Détection de portes/fenêtres ouvertes</li>
                  </ul>
                </div>

                <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 flex-wrap">
                    <Mic className="text-cyan-400" size={20} />
                    <span className="text-sm sm:text-base">4. Capteurs Audio (Microphones)</span>
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Détection de bruits suspects (bris de vitre, cris)</li>
                    <li>• Analyse des sons anormaux par IA</li>
                    <li>• Triangulation sonore pour localisation</li>
                    <li>• Enregistrement audio lors d'alertes</li>
                    <li>• Filtrage des bruits ambiants normaux</li>
                  </ul>
                </div>

                <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 flex-wrap">
                    <Cpu className="text-cyan-400" size={20} />
                    <span className="text-sm sm:text-base">5. Intelligence Artificielle - Fusion Multi-Capteurs</span>
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Compare l'état actuel avec l'état "normal" mémorisé</li>
                    <li>• Apprentissage automatique des patterns habituels</li>
                    <li>• Fusion des données de tous les capteurs</li>
                    <li>• Réduction drastique des fausses alertes (96% précision)</li>
                    <li>• Détection d'anomalies complexes indétectables par un seul capteur</li>
                    <li>• Amélioration continue par machine learning</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/50 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 text-cyan-400">🎯 Processus de Détection d'Intrusion</h3>
                  <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <span className="bg-cyan-500 text-black px-2 sm:px-3 py-1 rounded font-bold flex-shrink-0">1</span>
                      <span>Caméra capture l'image en continu</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <span className="bg-cyan-500 text-black px-2 sm:px-3 py-1 rounded font-bold flex-shrink-0">2</span>
                      <span>IA analyse l'image (détection personnes/objets)</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <span className="bg-cyan-500 text-black px-2 sm:px-3 py-1 rounded font-bold flex-shrink-0">3</span>
                      <span>Si détection → Vérification croisée avec PIR + Ultrason</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <span className="bg-cyan-500 text-black px-2 sm:px-3 py-1 rounded font-bold flex-shrink-0">4</span>
                      <span>IA vérifie: heure, zone, profil autorisé, comportement</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <span className="bg-cyan-500 text-black px-2 sm:px-3 py-1 rounded font-bold flex-shrink-0">5</span>
                      <span>Si intrusion confirmée → ALERTE instantanée + Enregistrement</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}