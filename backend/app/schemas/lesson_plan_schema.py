from marshmallow import Schema, fields


class LessonPlanSchema(Schema):
    id = fields.Int(dump_only=True)

    title = fields.Str(required=True)

    objective = fields.Str(required=True)

    summary = fields.Str(required=True)

    discipline = fields.Str(required=True)

    contents = fields.Str()

    support_resources = fields.Str()

    tags = fields.Str()

    expected_date = fields.Date()

    created_at = fields.DateTime(dump_only=True)
