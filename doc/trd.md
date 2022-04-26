# TRD

- [TRD](#trd)
  - [Typescript](#typescript)
  - [Global State](#global-state)
    - [Mobx](#mobx)
  - [Routing : Wouter](#routing--wouter)
  - [Ui Librairies](#ui-librairies)
    - [Chakra UI](#chakra-ui)
    - [ReCharts](#recharts)
    - [Styled Components](#styled-components)
  - [Charts Implementation](#charts-implementation)
  - [Responsive Web App](#responsive-web-app)
  - [Improvements](#improvements)

## Typescript

Typescript is a must have for me on a javascript/node project (front or back).  
I find the typing of ts way too powerfull.

It provides security and consistency during the development.

> For the development, I'm also using eslint and prettier (based on airbnb rules with some customs) for linting and formatting.

## Global State

I set up a global state on the project. It's really useful to have when your project starts to grow, so you don't have to hand down your data over many prop depths.

### Mobx

[Mobx](https://github.com/mobxjs/mobx) is a state management library. It was created after [Redux](https://github.com/reduxjs/redux) and it is lighter. This allows us to have a state that can be observed and mutated. (observation, observable values, computed values etc...)

> When I used redux (quite a long time ago), it was really painful to work with and really heavy. That's why I turned to mobx, but I heard [Redux Toolkit](https://github.com/reduxjs/redux-toolkit) is a good alternative now, but I still don't have it not tested.

For this project, I split my global state into 2 stores:

- dataStore: manages all antelope data (fetching, filtering, sorting, etc.)
- analysisStore: manages chart analysis (based on dataStore data)

I provide store access to all my app through a context provider at the top of the app and a hook used to get that context in a component.

## Routing : Wouter

Since there are not many routes and the system is quite simple, I chose to use a minimalist lightweight router: [Wouter](https://github.com/molefrog/wouter).

> I didn't want to use [React Router](https://github.com/remix-run/react-router) because it's a small poc and I don't need all the features react-router brings.

## Ui Librairies

### Chakra UI

[Chakra UI] (https://chakra-ui.com/) is a component library which I used to get some ready to use components like Modal, CheckBox, Slider, Switch etc...  
Chakra is also a great library for theming and creating Styled System but for this project I only used it for its out of the box made components as it is just a poc.

> I also used [react-feather](https://github.com/feathericons/react-feather) for icons, a React package to use open source icons [feathericons](https://feathericons.com /).

### ReCharts

I select [ReCharts](https://recharts.org/en-US/api) for charting.  
I used their components as a base to create mines, adapted to the application data.

### Styled Components

[Styled Components](https://styled-components.com/) is one of my favorite UI tools.  
It's a lightweight library that lets you create CSS-only components and use them like React components.

I use it for these reasons:

- you can write real css instead of the usual react way and keep all the css on the component file without having to create a separate css file:

```tsx
// React way (+ a css file to set :hover, @media etc...)
function MyComp() {
  return (
    <div className="wrapper" style={{ display: "flex", marginBottom: "5px" }}>
      ...
    </div>
  );
}

// StyledComponents way
const MyCompWrapper = styled.div`
  @media only screen and (max-width: 600px) {
      ...
  }

  :hover {
      ...
  }

  display: flex;
  margin-bottom: 5px;
`;

function MyComp() {
  return <MyCompWrapper>...</MyCompWrapper>;
}
```

- It can be coupled with others React components (from a library or your own) :

```tsx
const CustomButton = styled(ChakraUIButton)`...`;
```

- It makes the code way more readable:

```tsx
// Instead of having this
function MyComp() {
  return (
    <div style={{...}}>
      <header style={{...}}>...</header>
      <div style={{...}}>...</div>
    </div>
  );
}

// We can do this
const Layout = styled.div`...`;
const Header = styled.header`...`;
const Body= styled.div`...`;


function MyComp() {
  return (
    <Layout>
      <Header>...<Header/>
      <Body>...</Body>
    </Layout>
  );
}
```

## Charts Implementation

I tried to make a really generic charting implementation, so if we want to add another type of chart or another chart data field,
it should be easy to implement and add to the webapp.

On the App, a chart is represented by a schema :

```ts
export type DataField = keyof Pick<Antelope, "continent" | "horns">;

export type ChartType = "bar" | "line" | "pie";

export interface ChartSchema {
  title: string;
  type: ChartType;
  dataOne: DataField;
  dataTwo?: DataField;
  stacked?: boolean;
}
```

So to store/create our charts, we only handle schemas. Then, when we want to render the chart, the data is calculated based on the given schema.

Creating charts should be easy :

```ts
initialCharts: [
    {
      type: "pie",
      title: "Antelopes per continent",
      dataOne: "continent",
    },
    {
      type: "line",
      title: "Antelopes per horns",
      dataOne: "horns",
    },
    {
      type: "bar",
      title: "Antelopes by horns per continent",
      dataOne: "continent",
      dataTwo: "horns",
      stacked: true,
    },
    {
      type: "bar",
      title: "Antelopes by continent per horn",
      dataOne: "horns",
      dataTwo: "continent",
      stacked: false,
    },
  ],
```

and also offer the user the possibility of creating their own charts (ChartMakerModal)!

## Responsive Web App

To make the app responsive to all screens, I combined breakpoints and flexbox on the css.

> https://flexboxfroggy.com/ really good way to learn flex !

We could also use Grid instead of flex.

## Improvements

With more time I would do:

- Provide the ability to use weight/height data on charts (maybe an average could be interesting)
- Provide more chart types
- Create a back-end that would do all the logic on the data
- Create and use a theme on Chakra UI, to get more consistency (spacing, colors etc...)
