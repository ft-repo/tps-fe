/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useRef } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'


interface Props {

}

const Map: React.FC<Props> = (props) => {
  const { } = props
  const mapRef = useRef<HTMLDivElement | null>(null)

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
			style={{
				width: "100%",
				height: "100%",
				// minHeight: "496px",
				minHeight: "31rem",
				border: 0
			}}
			className="!rounded-lg"
			ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default React.memo<Props>(Map)
