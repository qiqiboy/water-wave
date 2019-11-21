// Type definitions for water-wave@>1.3.0
// Project: water-wave
// Definitions by: qiqiboy <https://github.com/qiqiboy>

import React from 'react';

export interface WaterWaveProps {
    alpha?: 'auto' | number;
    color?: string;
    disabled?: boolean;
    duration?: number;
    effect?: 'ripple' | 'wave' | 'starLight' | 'petal' | 'helix';
    origin?: string;
    press?: 'up' | 'down';
    radius?: string;
    stopPropagation?: boolean;
}

export class WaterWave extends React.Component<WaterWaveProps> {}
