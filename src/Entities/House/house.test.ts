import House, { HouseError } from ".";
import { Id } from "../../Shared/valueObjects/primitives";
import Rent from "./Rent";
import Person from "./valueObjects/Person";


House
describe('House', () => {
  const John = new Person({ fiscalName: 'Razon social', taxRegime: 606, rfc: 'XAXX010101000', postalCode: 44700, name: "John Doe" });
  const tenant = new Person({ fiscalName: 'Razon social XXX', taxRegime: 606, rfc: 'XAXX010101000', postalCode: 44700, name: "The other John" });;
  test('should create a new instance of House', () => {

    const house = new House('', John, 123456, 'Casa Azul');

    expect(house).toBeDefined();
    expect(house.rental).toBeNull();
    expect(house.alias).toBe('Casa Azul');
  });

  test('Debería poder poner una casa en alquiler', () => {
    const house = new House('', John, 123456, 'Casa Azul');
    const rent = new Rent(1000, 500);  // precio mensual y depósito

    house.putForRent(rent);

    expect(house.rental).toBe(rent);
  });

  test('Debería lanzar un error si la casa ya está en alquiler', () => {
    const house = new House('', John, 123456, 'Casa Azul');
    const rent = new Rent(1000, 500);

    house.putForRent(rent);  // Primera vez: exitoso

    expect(() => {
      house.putForRent(rent);  // Segunda vez: error
    }).toThrow(HouseError);
  });


  test('Debería poder quitar una casa del estado de alquiler', () => {
    const house = new House('', John, 123456, 'Casa Azul');
    const rent = new Rent(1000, 500);

    house.putForRent(rent);
    house.removeFromRent();

    expect(house.rental).toBeNull();
  });


  test('Debería lanzar un error si la casa no está alquilada y se intenta remover el alquiler', () => {
    const house = new House('', John, 123456, 'Casa Azul');

    expect(() => {
      house.removeFromRent();
    }).toThrow(HouseError);
  });

  test('Debería poder alquilar la casa a un inquilino', () => {
    const house = new House('', John, 123456, 'Casa Azul');
    const rent = new Rent(1000, 500);

    house.putForRent(rent);
    const startDate = 1726698431356; // 18-09-2024

    house.rentHouse(tenant, startDate);

    expect(house.rental).not.toBeNull();

    expect(house.rental?.startDate).toEqual({ "formatted": "18 de septiembre de 2024", "miliseconds": 1726698431356 });
  });


  test('Debería lanzar un error si la casa no está disponible para alquiler', () => {
    const house = new House('', John, 123456, 'Casa Azul');

    const startDate = 1726698431356; // 18-09-2024

    expect(() => {
      house.rentHouse(tenant, startDate);
    }).toThrow(HouseError);
  });


  test('Debería liberar la casa del estado de alquiler', () => {
    const house = new House('', John, 123456, 'Casa Azul');
    const rent = new Rent(1000, 500);

    house.putForRent(rent);
    const startDate = 1726698431356; // 18-09-2024
    house.rentHouse(tenant, startDate);

    house.releaseHouse();

    expect(house.rental).toBeNull();
  });


  test('Debería lanzar un error si la casa no está alquilada y se intenta liberar', () => {
    const house = new House('', John, 123456, 'Casa Azul');

    expect(() => {
      house.releaseHouse();
    }).toThrow(HouseError);
  });





});

