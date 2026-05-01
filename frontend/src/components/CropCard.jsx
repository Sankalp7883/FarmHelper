import { useNavigate } from 'react-router-dom';
import {
  HiOutlineLocationMarker,
  HiOutlineBeaker,
  HiOutlineClock,
  HiOutlineColorSwatch,
} from 'react-icons/hi';
import { WiThermometer } from 'react-icons/wi';

const GRADIENT_CLASSES = [
  'crop-gradient-1',
  'crop-gradient-2',
  'crop-gradient-3',
  'crop-gradient-4',
  'crop-gradient-5',
  'crop-gradient-6',
];

const CropCard = ({ crop, index }) => {
  const navigate = useNavigate();

  const getBadgeClass = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'badge-low';
      case 'high': return 'badge-high';
      default: return 'badge-medium';
    }
  };

  const gradientClass = GRADIENT_CLASSES[index % GRADIENT_CLASSES.length];

  return (
    <div
      className="crop-card"
      style={{ animationDelay: `${index * 0.07}s`, cursor: 'pointer' }}
      id={`crop-card-${index}`}
      onClick={() => navigate(`/crop/${encodeURIComponent(crop.cropName)}`)}
    >
      {/* Gradient Header Strip */}
      <div className={`crop-card-gradient ${gradientClass}`} />

      <div className="crop-card-body">
        <div className="crop-card-header">
          <h3 className="crop-card-name">{crop.cropName}</h3>
          {crop.waterRequirement && (
            <span className={`crop-card-badge ${getBadgeClass(crop.waterRequirement)}`}>
              💧 {crop.waterRequirement}
            </span>
          )}
        </div>

        <p className="crop-card-desc">{crop.description}</p>

        <div className="crop-card-meta">
          <div className="crop-meta-row">
            <HiOutlineColorSwatch className="crop-meta-icon" />
            <span className="crop-meta-label">Soil</span>
            <span className="crop-meta-value">{crop.soilType?.join(', ')}</span>
          </div>
          <div className="crop-meta-row">
            <HiOutlineLocationMarker className="crop-meta-icon" />
            <span className="crop-meta-label">Season</span>
            <span className="crop-meta-value">{crop.season?.join(', ')}</span>
          </div>
          <div className="crop-meta-row">
            <WiThermometer className="crop-meta-icon" />
            <span className="crop-meta-label">Temp</span>
            <span className="crop-meta-value">
              {crop.temperatureRange?.min}°C – {crop.temperatureRange?.max}°C
            </span>
          </div>
          {crop.growingPeriod && (
            <div className="crop-meta-row">
              <HiOutlineClock className="crop-meta-icon" />
              <span className="crop-meta-label">Duration</span>
              <span className="crop-meta-value">{crop.growingPeriod}</span>
            </div>
          )}
        </div>

        {crop.fertilizers && crop.fertilizers.length > 0 && (
          <div className="crop-card-fertilizers">
            <div className="crop-fertilizer-title">
              <HiOutlineBeaker style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
              Recommended Fertilizers
            </div>
            <div className="crop-fertilizer-tags">
              {crop.fertilizers.map((f, i) => (
                <span key={i} className="fertilizer-tag">{f}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropCard;
