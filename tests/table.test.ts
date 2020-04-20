import { Table } from "../mod.ts";
import { assertEquals } from "https://deno.land/std@v0.34.0/testing/asserts.ts";

const strings = [
	{
		name: "Standard Table",
		string: new Table('testName')
			.toSql(),
		solution: "testName ();",
	}, {
		name: "Table with custom",
		string: (() => {
			const table = new Table('testName')
			table.custom('testName testType')
			return table.toSql()
		})(),
		solution: "testName (testName testType);",
	}, {
		name: "Table with two custom",
		string: (() => {
			const table = new Table('testName')
			table.custom('testName testType')
			table.custom('testName2 testType2')
			return table.toSql()
		})(),
		solution: "testName (testName testType, testName2 testType2);",
	}, {
		name: "Table with 1 unique",
		string: (() => {
			const table = new Table('testName')
			table.integer('testCol')
			table.unique('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol integer); ALTER TABLE testName ADD UNIQUE(testCol);",
	}, {
		name: "Table with 2 unique",
		string: (() => {
			const table = new Table('testName')
			table.integer('testCol')
			table.integer('testCol2')
			table.unique(['testCol', 'testCol2'])
			return table.toSql()
		})(),
		solution: "testName (testCol integer, testCol2 integer); ALTER TABLE testName ADD UNIQUE(testCol, testCol2);",
	}, {
		name: "Table with 1 primary",
		string: (() => {
			const table = new Table('testName')
			table.integer('testCol')
			table.primary('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol integer); ALTER TABLE testName ADD PRIMARY KEY (testCol);",
	}, {
		name: "Table with 2 primary",
		string: (() => {
			const table = new Table('testName')
			table.integer('testCol')
			table.integer('testCol2')
			table.primary('testCol', 'testCol2')
			return table.toSql()
		})(),
		solution: "testName (testCol integer, testCol2 integer); ALTER TABLE testName ADD PRIMARY KEY (testCol, testCol2);",
	}, {
		name: "Table with 1 index",
		string: (() => {
			const table = new Table('testName')
			table.integer('testCol')
			table.index('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol integer); CREATE INDEX ON testName (testCol);",
	}, {
		name: "Table with 2 index",
		string: (() => {
			const table = new Table('testName')
			table.integer('testCol')
			table.integer('testCol2')
			table.index('testCol')
			table.index('testCol2')
			return table.toSql()
		})(),
		solution: "testName (testCol integer, testCol2 integer); CREATE INDEX ON testName (testCol); CREATE INDEX ON testName (testCol2);",
	}, {
		name: "Table with 2 index alt",
		string: (() => {
			const table = new Table('testName')
			table.integer('testCol')
			table.integer('testCol2')
			table.index('testCol', 'testCol2')
			return table.toSql()
		})(),
		solution: "testName (testCol integer, testCol2 integer); CREATE INDEX ON testName (testCol); CREATE INDEX ON testName (testCol2);",
	}, {
		name: "Table with id",
		string: (() => {
			const table = new Table('testName')
			table.id()
			return table.toSql()
		})(),
		solution: "testName (id bigserial);",
	}, {
		name: "Table with bigIncrements",
		string: (() => {
			const table = new Table('testName')
			table.bigIncrements('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol bigserial);",
	}, {
		name: "Table with binary",
		string: (() => {
			const table = new Table('testName')
			table.binary('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol bytea);",
	}, {
		name: "Table with boolean",
		string: (() => {
			const table = new Table('testName')
			table.boolean('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol boolean);",
	}, {
		name: "Table with char",
		string: (() => {
			const table = new Table('testName')
			table.char('testCol', 1)
			return table.toSql()
		})(),
		solution: "testName (testCol character (1));",
	}, {
		name: "Table with createdAt",
		string: (() => {
			const table = new Table('testName')
			table.createdAt()
			return table.toSql()
		})(),
		solution: "testName (created_at timestamp (0) default now());",
	}, {
		name: "Table with createdAtTz",
		string: (() => {
			const table = new Table('testName')
			table.createdAtTz()
			return table.toSql()
		})(),
		solution: "testName (created_at timestamptz (0) default now());",
	}, {
		name: "Table with date",
		string: (() => {
			const table = new Table('testName')
			table.date('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol date);",
	}, {
		name: "Table with dateTime",
		string: (() => {
			const table = new Table('testName')
			table.dateTime('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol timestamp (0));",
	}, {
		name: "Table with dateTimeTz",
		string: (() => {
			const table = new Table('testName')
			table.dateTimeTz('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol timestamptz (0));",
	}, {
		name: "Table with decimal",
		string: (() => {
			const table = new Table('testName')
			table.decimal('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol decimal (8, 2));",
	}, {
		name: "Table with double",
		string: (() => {
			const table = new Table('testName')
			table.double('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol float8 (8, 2));",
	}, {
		name: "Table with enum",
		string: (() => {
			const table = new Table('testName')
			table.enum('testCol', ['one', 'two', 'three'])
			return table.toSql()
		})(),
		solution: "CREATE TYPE testCol AS ENUM (one, two, three); testName (testCol testCol (one,two,three));"
	}, {
		name: "Table with float",
		string: (() => {
			const table = new Table('testName')
			table.float('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol float8 (8, 2));"
	}, {
		name: "Table with increments",
		string: (() => {
			const table = new Table('testName')
			table.increments('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol serial);"
	}, {
		name: "Table with integer",
		string: (() => {
			const table = new Table('testName')
			table.integer('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol integer);"
	}, {
		name: "Table with ipAddress",
		string: (() => {
			const table = new Table('testName')
			table.ipAddress('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol inet);"
	}, {
		name: "Table with json",
		string: (() => {
			const table = new Table('testName')
			table.json('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol json);"
	}, {
		name: "Table with jsonb",
		string: (() => {
			const table = new Table('testName')
			table.jsonb('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol jsonb);"
	}, {
		name: "Table with macAddress",
		string: (() => {
			const table = new Table('testName')
			table.macAddress('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol macaddr);"
	}, {
		name: "Table with macAddress8",
		string: (() => {
			const table = new Table('testName')
			table.macAddress8('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol macaddr8);"
	}, {
		name: "Table with point",
		string: (() => {
			const table = new Table('testName')
			table.point('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol point);"
	}, {
		name: "Table with polygon",
		string: (() => {
			const table = new Table('testName')
			table.polygon('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol polygon);"
	}, {
		name: "Table with smallIncrements",
		string: (() => {
			const table = new Table('testName')
			table.smallIncrements('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol smallserial);"
	}, {
		name: "Table with smallInteger",
		string: (() => {
			const table = new Table('testName')
			table.smallInteger('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol smallint);"
	}, {
		name: "Table with string",
		string: (() => {
			const table = new Table('testName')
			table.string('testCol', 1)
			return table.toSql()
		})(),
		solution: "testName (testCol varchar (1));"
	}, {
		name: "Table with text",
		string: (() => {
			const table = new Table('testName')
			table.text('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol text);"
	}, {
		name: "Table with time",
		string: (() => {
			const table = new Table('testName')
			table.time('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol time (0));"
	}, {
		name: "Table with timeTz",
		string: (() => {
			const table = new Table('testName')
			table.timeTz('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol timetz (0));"
	}, {
		name: "Table with timestamp",
		string: (() => {
			const table = new Table('testName')
			table.timestamp('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol timestamp (0));"
	}, {
		name: "Table with timestamp",
		string: (() => {
			const table = new Table('testName')
			table.timestampTz('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol timestamptz (0));"
	}, {
		name: "Table with timestamps",
		string: (() => {
			const table = new Table('testName')
			table.timestamps()
			return table.toSql()
		})(),
		solution: "testName (created_at timestamp (0) default now(), updated_at timestamp (0) default now()); DROP TRIGGER IF EXISTS set_timestamp on some_table; CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.testName FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();"
	}, {
		name: "Table with timestampsTz",
		string: (() => {
			const table = new Table('testName')
			table.timestampsTz()
			return table.toSql()
		})(),
		solution: "testName (created_at timestamptz (0) default now(), updated_at timestamptz (0) default now()); DROP TRIGGER IF EXISTS set_timestamp on some_table; CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.testName FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();"
	}, {
		name: "Table with updatedAt",
		string: (() => {
			const table = new Table('testName')
			table.updatedAt()
			return table.toSql()
		})(),
		solution: "testName (updated_at timestamp (0) default now()); DROP TRIGGER IF EXISTS set_timestamp on some_table; CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.testName FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();"
	}, {
		name: "Table with updatedAtTz",
		string: (() => {
			const table = new Table('testName')
			table.updatedAtTz()
			return table.toSql()
		})(),
		solution: "testName (updated_at timestamptz (0) default now()); DROP TRIGGER IF EXISTS set_timestamp on some_table; CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.testName FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();"
	}, {
		name: "Table with text",
		string: (() => {
			const table = new Table('testName')
			table.uuid('testCol')
			return table.toSql()
		})(),
		solution: "testName (testCol uuid);"
	},
];

strings.forEach(({ name, string, solution }) =>
	Deno.test({
		name: name || "Empty",
		fn(): void {
			assertEquals(string, solution);
		},
	})
);