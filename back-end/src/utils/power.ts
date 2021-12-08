// kt = (NOCT - 20)/800 -> Coeficiente térmico

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { stc, tempP, days, weight, dimensions } from "@src/utils/constants";

export const calcTamb = async (nearCity: string): Promise<number[]> => {
  let data: number[] = [];

  const temperaturas = await prisma.temperatura.findFirst({
    where: {
      ESCOLHA: nearCity,
    },
  });

  data = [
    temperaturas["JANEIRO"],
    temperaturas["FEVEREIRO"],
    temperaturas["MARCO"],
    temperaturas["ABRIL"],
    temperaturas["MAIO"],
    temperaturas["JUNHO"],
    temperaturas["JULHO"],
    temperaturas["AGOSTO"],
    temperaturas["SETEMBRO"],
    temperaturas["OUTUBRO"],
    temperaturas["NOVEMBRO"],
    temperaturas["DEZEMBRO"],
  ];
  return data;
};

export const tempCorrection = (NOCT: number, Tamb: number[]): number[] => {
  const kt = (NOCT - 20) / 800;
  const Tc: number[] = [];
  for (let i = 0; i < Tamb.length; i += 1) {
    const tc = Tamb[i] + kt * 1000 * 0.9;
    Tc.push(tc);
  }
  return Tc;
};

export const powerCorrection = (Tamb: number[]): number[] => {
  const inverterEfficiency = 0.986;
  const lost = 0.1;
  const Pn = stc.Pmp;
  const NOCT = stc.NOCT;
  const Tc = tempCorrection(NOCT, Tamb);
  const coef = (tempP / 100) * -1;
  const Power: number[] = [];
  for (let i = 0; i < Tc.length; i += 1) {
    const power = Pn * (1 - coef * (Tc[i] - 25));
    Power.push(power * (1 - lost) * inverterEfficiency);
  }
  return Power;
};

export const bestTilt = (lat: number): number => {
  let t = lat;
  if (lat < 0) {
    t = t * -1;
  }
  const tilt = 3.7 * (0.69 * t);
  return tilt;
};

export const tiltCorrection = async (
  tilt: number,
  lat: number
): Promise<number[]> => {
  let latitude = Math.ceil(lat);
  if (lat < 0) {
    latitude = latitude * -1;
  }

  let t = tilt / 10;
  const c = Math.ceil(t) - 1;
  const d = t - c;
  if (d < 0.5) {
    t = (Math.ceil(t) - 1) * 10;
  } else if (d > 0.5) {
    t = Math.ceil(t) * 10;
  } else {
    t = (Math.ceil(t) - 1) * 10 + 5;
  }
  const search = latitude + t / 100;

  const results = await prisma.inclinacao.findFirst({
    where: {
      latinclina: search,
    },
  });

  let data: number[] = [];
  if (results) {
    data = [
      results["Jan"],
      results["Fev"],
      results["Mar"],
      results["Abr"],
      results["Mai"],
      results["Jun"],
      results["Jul"],
      results["Ago"],
      results["Set"],
      results["Out"],
      results["Nov"],
      results["Dez"],
    ];
  }

  return data;
};

export const getHsp = async (city: string): Promise<number[]> => {
  const hsp = await prisma.irradiation.findFirst({
    where: {
      NAME: city,
    },
  });

  let data: number[] = [];
  if (hsp) {
    data = [
      hsp["JAN"],
      hsp["FEB"],
      hsp["MAR"],
      hsp["APR"],
      hsp["MAY"],
      hsp["JUN"],
      hsp["JUL"],
      hsp["AUG"],
      hsp["SEP"],
      hsp["OCT"],
      hsp["NOV"],
      hsp["DEC"],
    ];
  }

  return data;
};

export const calcHSP = async (city: string, lat: number): Promise<number[]> => {
  const inclinacao = await tiltCorrection(15, lat);
  const hsp = await prisma.irradiation.findFirst({
    where: {
      NAME: city,
    },
  });

  const data: number[] = [];
  if (hsp) {
    const HSP = [
      hsp["JAN"],
      hsp["FEB"],
      hsp["MAR"],
      hsp["APR"],
      hsp["MAY"],
      hsp["JUN"],
      hsp["JUL"],
      hsp["AUG"],
      hsp["SEP"],
      hsp["OCT"],
      hsp["NOV"],
      hsp["DEC"],
    ];
    for (let i = 0; i < inclinacao.length; i += 1) {
      data.push(HSP[i] * inclinacao[i]);
    }
  }
  return data;
};

export const energyProduction = async (
  Power: number[],
  city: string,
  lat: number
): Promise<number[]> => {
  const HSP: number[] = await calcHSP(city, lat);
  const data: number[] = [];
  for (let i = 0; i < Power.length; i += 1) {
    const energy = (Power[i] * HSP[i] * days[i]) / 1000;

    data.push(parseFloat(energy.toFixed(2)));
  }

  return data;
};

interface Power {
  power: number;
  number: number;
}

export const calcPvPower = (
  energy: number[],
  demand: number,
  disponibilidade: number
): Power => {
  const sum = energy.reduce((a, b) => a + b, 0);
  const avg = sum / energy.length || 0;
  return {
    power: (Math.ceil((demand - disponibilidade) / avg) * stc.Pmp) / 1000,
    number: Math.ceil((demand - disponibilidade) / avg),
  };
};

export const calcAvgProduction = (
  energy: number[],
  qtd: number
): {
  energy: number[];
  average: number;
} => {
  const data = [];
  for (let i = 0; i < energy.length; i += 1) {
    data.push(parseFloat((qtd * energy[i]).toFixed(0)));
  }
  const sum = data.reduce((a, b) => a + b, 0);
  const avg = sum / data.length || 0;
  return {
    energy: data,
    average: parseFloat(avg.toFixed(0)),
  };
};

export const calcAreaWeight = (
  qtd: number
): { weight: number; area: number } => {
  const totalWeight = weight * qtd;
  const totalArea =
    (dimensions.height / 1000) * (dimensions.width / 1000) * qtd;
  return {
    weight: parseFloat(totalWeight.toFixed(2)),
    area: parseFloat(totalArea.toFixed(2)),
  };
};
