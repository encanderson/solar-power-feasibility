import { Request, Response } from "express";

import { sizing } from "@src/services/sizing.services";

import { SizeInput } from "@src/@types/sizing";

import { PrismaClient } from "@prisma/client";

export const pvSizing = async (req: Request, res: Response): Promise<void> => {
  try {
    const nearCity = req.body.nearCity;

    const data: SizeInput = {
      city: req.body.city,
      demand: req.body.demand,
      disponibilidade: req.body.disponibilidade,
      distributor: req.body.distributor,
      state: req.body.state,
      zip: req.body.zip,
    };

    const address = data.city + "-" + data.state + ", " + data.zip;
    const resp = await sizing(address, nearCity, data);
    if (resp) {
      res.status(200).send(resp);
    } else {
      return null;
    }
  } catch (err) {
    res.status(500).send({
      message: "We get a trouble in our server, please, try again.",
    });
  }
};

const prisma = new PrismaClient();

export const getCities = async (req: Request, res: Response): Promise<void> => {
  try {
    const cities = await prisma.temperatura.findMany();

    const data = cities.map((item) => ({
      label: item.ESCOLHA,
      value: item.Cidade,
    }));

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: "We get a trouble in our server, please, try again.",
    });
  }
};
