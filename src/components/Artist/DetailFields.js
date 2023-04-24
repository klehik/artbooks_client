import DetailField from './DetailField'

const DetailFields = ({ book }) => {
  // fields to display and corresponding titles
  const fieldsToDisplay = {
    title: 'Title',
    artist: 'Artist',
    writer: 'Writer',
    graphicDesigner: 'Graphic Designer',
    description: 'Description',
  }

  const renderFields = () => {
    var fields = []
    for (const [key, value] of Object.entries(book)) {
      if (fieldsToDisplay[key]) {
        fields.push(
          <DetailField
            key={key}
            fieldName={key}
            fieldTitle={fieldsToDisplay[key]}
            defaultValue={value}
            bookId={book.id}
          ></DetailField>
        )
      }
    }
    return fields
  }
  return <>{renderFields()}</>
}

export default DetailFields
